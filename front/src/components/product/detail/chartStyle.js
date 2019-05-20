import lime from '@material-ui/core/colors/lime'// A700
import green from '@material-ui/core/colors/green'//700
import yellow from '@material-ui/core/colors/yellow' //A400
import orange from '@material-ui/core/colors/orange' //A400
import red from '@material-ui/core/colors/red' //A400

const chartStyle = () => ({
  good: {
    backgroundColor: lime.A700,
    boxShadow: `0px 1px 1px ${lime.A700}`,
  },
  soso: {
    backgroundColor: green[700],
    boxShadow: `0px 1px 1px ${green[700]}`,
  },
  normal: {
    backgroundColor: yellow.A400,
    boxShadow: `0px 1px 1px ${yellow.A400}`,
  },
  undernormal: {
    backgroundColor: orange.A400,
    boxShadow: `0px 1px 1px ${orange.A400}`,
  },
  bad: {
    backgroundColor: red.A400,
    boxShadow: `0px 1px 1px ${red.A400}`,
  },
})

export default chartStyle
