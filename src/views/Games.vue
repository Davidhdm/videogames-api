<template>
  <div class="container">
    <header class="header">
      <div class="search_box">
        <div class="searchInput_box">
          <span class="iconify search_icon" data-icon="bx:bx-search"></span>
          <input class="searchInput" type="search" name="search_game" placeholder="Search..." v-model="$store.state.search">
        </div>
        <div class="searchBy">
          <a href="#" @click="toggleSearchByDropdown" @blur="$store.state.searchByDropdownIsOpen = false" class="searchBy_dropdown">
            {{ currentSearchByStatus }}
            <span class="iconify searchBy_icon" data-icon="ic:sharp-arrow-back-ios-new" data-rotate="270deg"></span>
          </a>
          <transition name="expand">
            <div v-show="$store.state.searchByDropdownIsOpen" class="searchBy_options">
              <span @click="setSearchType('')" class="searchBy_option">All</span>
              <span @click="setSearchType('Title')" class="searchBy_option">Title</span>
              <span @click="setSearchType('Release year')" class="searchBy_option">Release year</span>
              <span @click="setSearchType('Categories')" class="searchBy_option">Categories</span>
            </div>
          </transition>
        </div>
        <div class="filterPlayed">
          <a href="#" @click="toggleFilterDropdown" @blur="$store.state.filterIsOpen = false" class="openFilterBtn searchBy_dropdown">
            <span class="iconify openFilterBtn_icon" data-icon="cil:filter"></span>
            {{ currentFilterPlayedStatus }}
          </a>
          <transition name="expand">
            <div v-show="$store.state.filterIsOpen" class="filter_box searchBy_options">
              <span @click="filterByPlayedStatus('All')" class="searchBy_option">All</span>
              <span @click="filterByPlayedStatus('Played')" class="searchBy_option">Played</span>
              <span @click="filterByPlayedStatus('Not played')" class="searchBy_option">Not played</span>
              <span @click="filterByPlayedStatus('In progress')" class="searchBy_option">In progress</span>
            </div>
          </transition>
        </div>
      </div>
      <h1 class="numberOfGames">{{ numberOfGames }}</h1>
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
    toggleSearchByDropdown () {
      this.$store.state.searchByDropdownIsOpen = !this.$store.state.searchByDropdownIsOpen
    },
    setSearchType (searchType) {
      this.$store.state.searchType = searchType
    },
    toggleFilterDropdown () {
      this.$store.state.filterIsOpen = !this.$store.state.filterIsOpen
    }
  },
  computed: {
    numberOfGames () {
      return `Showing ${this.filterGames.length} games`
    },
    currentSearchByStatus () {
      return this.$store.state.searchType || 'Search by...'
    },
    currentFilterPlayedStatus () {
      return this.$store.state.filterPlayed || 'All'
    },
    filterGames () {
      let games = []
      const storeState = this.$store.state
      const searchType = storeState.searchType
      const filterPlayed = storeState.filterPlayed
      const search = storeState.search.toString().toLowerCase()

      switch (searchType) {
        case '':
          games = storeState.games.filter(game =>
            game.title.toLowerCase().includes(search) ||
            game.categories.toLowerCase().includes(search) ||
            game.release_year.toString().includes(search)
          )
          break
        case 'Title':
          games = storeState.games.filter(game => game.title.toLowerCase().includes(search))
          break
        case 'Release year':
          games = storeState.games.filter(game => game.release_year.toString().includes(search))
          break
        case 'Categories':
          games = storeState.games.filter(game => game.categories.toLowerCase().includes(search))
          break
      }

      switch (filterPlayed) {
        case 'Played':
          games = games.filter(game => game.played === 'Played')
          break
        case 'Not played':
          games = games.filter(game => game.played === 'Not played')
          break
        case 'In progress':
          games = games.filter(game => game.played === 'In progress')
          break
      }

      // Sort the list by game title
      games.sort((a, b) => (a.title > b.title ? 1 : -1))
      return games
    }
  },
  created () {
    this.getAllGames()
  }
}
</script>

<style>
body {
  background-color: var(--dark-color1);
  color: var(--light-color1);
}
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
  flex-direction: column;
  margin: 50px auto;
}

.numberOfGames {
  text-align: center;
  margin-top: 60px;
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
  background-color: var(--dark-color2);
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
  border-bottom: 1px solid var(--light-color1);
  height: max-content;
}

.openFilterBtn {
  cursor: pointer;
  display: flex;
  margin: 0 12px;
  height: min-content;
  max-height: min-content;
  padding: 3px;
  border-bottom: 1px solid var(--light-color1);
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
  top: 90px;
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
