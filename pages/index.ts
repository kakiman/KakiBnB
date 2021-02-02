import { Vue, Component } from 'nuxt-property-decorator'
import homes from '~/static/data/homes.json'

import HomeCard from '~/components/HomeCard/HomeCard'
import { Home } from '~/types'

@Component({
  name: 'index',
  components: {
    HomeCard
  }
})
export default class index extends Vue {
  homes: Home[]

  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          name: 'description',
          content: 'This is a homepage!',
          hid: 'description'
        }
      ]
    }
  }

  created() {
    this.homes = homes.slice(0, 3).map((h) => new Home(h))
  }
}
