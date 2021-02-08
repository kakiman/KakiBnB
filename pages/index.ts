import { Vue, Component } from 'nuxt-property-decorator'
import homes from '~/static/data/homes.json'

import HomeCard from '~/components/HomeCard'
import { Home } from '~/types'

@Component({
  name: 'index',
  components: {
    HomeCard
  },
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
})
export default class index extends Vue {
  homes: Home[]

  created() {
    this.homes = homes.slice(0, 3).map((h) => new Home(h))
  }
}
