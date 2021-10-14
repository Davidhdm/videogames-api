<template>
  <div class="container">
    <header class="header">
      <div class="search_box">
        <div class="searchInput_box">
          <span class="iconify search_icon" data-icon="bx:bx-search"></span>
          <input class="searchInput" type="search" name="search_game" placeholder="Search..." v-model="$store.state.search">
        </div>
        <div  class="searchBy">
          <a href="#" @click="toggleDropdown" @blur="$store.state.dropDownIsOpen = false" class="searchBy_dropdown">
            {{ $store.state.searchType || 'Search by...' }}
            <span class="iconify searchBy_icon" data-icon="ic:sharp-arrow-back-ios-new" data-rotate="270deg"></span>
          </a>
          <transition name="expand">
            <div v-show="$store.state.dropDownIsOpen" class="searchBy_options">
              <span @click="setSearchType('Title')" class="searchBy_option">Title</span>
              <span @click="setSearchType('Release year')" class="searchBy_option">Release year</span>
              <span @click="setSearchType('Categories')" class="searchBy_option">Categories</span>
              <span @click="setSearchType('All')" class="searchBy_option">All</span>
            </div>
          </transition>
        </div>
        <a href="#" @click.stop="toggleFilter" @blur="closeFilter" class="openFilterBtn">
          <span class="iconify openFilterBtn_icon" data-icon="cil:filter"></span>
          <transition name="expand">
            <div v-show="$store.state.filterIsOpen" class="filter_box">
              <label @click="filterByPlayedStatus('all')" for="filter_all" class="filterRadioBtn_label">
                <input v-model="$store.state.filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_all" value="All" checked>Show all games
              </label>

              <label @click="filterByPlayedStatus('played')" for="filter_played" class="filterRadioBtn_label">
                <input v-model="$store.state.filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_played" value="Played">Show only played games
              </label>

              <label @click="filterByPlayedStatus('notplayed')" for="filter_notplayed" class="filterRadioBtn_label">
                <input v-model="$store.state.filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_notplayed" value="Not played">Show only unplayed games
              </label>

              <label @click="filterByPlayedStatus('inprogress')" for="filter_inprogress" class="filterRadioBtn_label">
                <input v-model="$store.state.filterPlayed" type="radio" class="filterRadioBtn" name="filterPlayed" id="filter_inprogress" value="In progress">Show only in progress games
              </label>
            </div>
          </transition>
        </a>
      </div>
    </header>
    <main class="games">
      <CreateGameCard  v-show="$store.state.creating"/>
      <EditGameCard  v-show="$store.state.editing"/>

      <GameCard
        :game="game"
        v-for="game in filterGames"
        v-bind:key="game"
      />
      <button v-show="!$store.state.creating" @click="showCreateCard" class="createGame">
        <span class="iconify createGame_icon" data-icon="mdi:plus-thick"></span>
      </button>
    </main>
  </div>
</template>

<script>
import GameCard from '@/components/GameCard.vue'
import CreateGameCard from '@/components/CreateGameCard.vue'
import EditGameCard from '@/components/EditGameCard.vue'
import { gameService } from '@/services/gameService.js'

export default {
  name: 'Games',
  components: {
    GameCard,
    CreateGameCard,
    EditGameCard
  },
  methods: {
    async getAllGames () {
      try {
        const request = await gameService.getAllGames()
        this.$store.state.games = request.data
      } catch (error) {
        alert('Failed to load games')
        console.log(error.message)
      }
    },
    filterByPlayedStatus (status) {
      this.$store.state.filterPlayed = status
    },
    showCreateCard () {
      this.$store.state.editing = false
      this.$store.state.creating = true
      window.scrollTo(0, 0)
    },
    toggleDropdown () {
      this.$store.state.dropDownIsOpen = !this.$store.state.dropDownIsOpen
    },
    setSearchType (searchType) {
      this.$store.state.searchType = searchType
    },
    toggleFilter () {
      this.$store.state.filterIsOpen = !this.$store.state.filterIsOpen
    },
    closeFilter () {
      setTimeout(() => {
        this.$store.state.filterIsOpen = false
      }, 250)
    }
  },
  computed: {
    filterGames () {
      let games = []
      const search = this.$store.state.search.toString().toLowerCase()

      if (this.$store.state.searchType === 'All' || this.$store.state.searchType === '') {
        this.$store.state.games.forEach(game => {
          const gameValues = Object.values(game)

          for (let i = 0; i < gameValues.length; i++) {
            const convertedValue = gameValues[i].toString().toLowerCase()

            if (convertedValue.includes(search)) {
              games.push(game)
              break
            }
          }
        })
      }

      if (this.$store.state.searchType === 'Title') {
        games = this.$store.state.games.filter(game => game.title.toLowerCase().includes(search))
      }

      if (this.$store.state.searchType === 'Release year') {
        games = this.$store.state.games.filter(game => game.release_year.toString().includes(search))
      }

      if (this.$store.state.searchType === 'Categories') {
        games = this.$store.state.games.filter(game => game.categories.toLowerCase().includes(search))
      }

      if (this.$store.state.filterPlayed === 'Played') {
        games = games.filter(game => game.played === 'Played')
      }

      if (this.$store.state.filterPlayed === 'Not played') {
        games = games.filter(game => game.played === 'Not played')
      }

      if (this.$store.state.filterPlayed === 'In progress') {
        games = games.filter(game => game.played === 'In progress')
      }

      return games
    }
  },
  created () {
    this.getAllGames()
  }
}
</script>

<style>
.games {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 50px auto;
  max-width: max-content;
}

.createGame {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 75px;
  left: 75px;
  text-align: center;
  font-size: 220%;
  background-color: rgb(90, 235, 90);
  border: solid 1px rgb(31, 209, 31);
  cursor: pointer;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    transform 0.15s ease;
}

.createGame:hover,
.createGame:active {
  color: rgb(31, 209, 31);
  background-color: white;
}

.header {
  display: flex;
  margin: 50px auto;
}

.search_box {
  display: flex;
  justify-content: center;
  margin: 0px auto;
}

.searchInput {
  padding: 4px 8px;
  padding-left: 38px;
  border: none;
  outline: none;
  font-size: 19px;
  max-width: 100%;
}

.searchInput_box {
  position: relative;
  margin: 0px 12px;
  min-width: 150px;
  max-width: max-content;
  border-bottom: 1px solid black;
  height: max-content;
}

.search_icon {
  position: absolute;
  left: 0;
  top: 3px;
  font-size: 150%;
}

.searchBy_dropdown {
  width: max-content;
  height: max-content;
  font-size: 19px;
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  text-decoration: none;
  color: unset;
}

.searchBy_dropdown:hover {
  color: grey;
}

.searchBy_icon {
  display: inline;
}

.searchBy_options {
  width: 147px;
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 19px;
  -webkit-box-shadow: 0px 0px 18px 3px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 18px 3px rgba(0,0,0,0.3);
  border-radius: 8px;
  position: absolute;
  z-index: 5;
  top: 40px;
  overflow: hidden;
}

.searchBy_option {
  padding: 9px 9px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.searchBy_option:hover {
  background-color: rgb(95, 185, 241);
}

.searchBy {
  position: relative;
  display: flex;
  margin: 0px 12px;
  border-bottom: 1px solid black;
  height: max-content;
}

.openFilterBtn {
  cursor: pointer;
  display: flex;
  margin: 0 12px;
  height: min-content;
  max-height: min-content;
  padding: 3px;
  border-bottom: 1px solid black;
  position: relative;
  text-decoration: none;
  color: unset;
}

.openFilterBtn_icon {
  font-size: 150%;
}

.openFilterBtn_icon:hover {
  color: grey;
}

.filter_box {
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 40px;
  z-index: 5;
  width: max-content;
  background-color: white;
  -webkit-box-shadow: 0px 0px 18px 3px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 18px 3px rgba(0,0,0,0.3);
  border-radius: 8px;
  padding: 9px;
}

.filterRadioBtn {
  margin: 5px;
}

.filterRadioBtn_label {
  margin: 3px 0;
  font-size: 17px;
}

.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
}

@media (max-width: 414px) {
  .createGame {
    bottom: 25px;
    left: 25px;
  }

  .searchInput_box {
    max-width: 40vw;
  }

  .search_box {
    width: 100%;
    justify-content: space-between;
  }

  .searchBy_options {
    right: 0;
  }

  .openFilterBtn {
    position: fixed;
    left: 80px;
    bottom: 25px;
    background-color: white;
    z-index: 5;
    height: 40px;
    width: 40px;
    border-radius: 7px;
    border: solid 1px black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .openFilterBtn_icon:hover {
    color: black;
  }

  .openFilterBtn_icon {
    font-size: 150%;
  }

  .filter_box {
    top: unset;
    bottom: 60px;
    left: 0px;
  }
}
</style>
