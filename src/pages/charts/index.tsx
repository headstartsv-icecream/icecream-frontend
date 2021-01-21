import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled from 'styled-components'
import Banner from 'src/components/Banner'
import MusicList from 'src/components/MusicList'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const PaddingTop = styled.div`
  padding-top: ${HEADER_HEIGHT};
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
      gridTemplateColumns: '1fr 1fr',
      // border: '2px solid #aaa',
    },
    item: {
      justifyContent: 'flex-start',
      padding: '0.5rem',
      // border: '2px solid #aaa',
    },
    chart: {
      width: '35vh',
    },
    thumbnail: {
      width: '65vh',
    },
  })
)

function ChartsPage() {
  const classes = useStyles()
  return (
    <PageTitle title="Icecream Music - Charts">
      <PageLayout>
        <Banner />
        <Grid container direction="row" className={classes.container}>
          <Grid item xs={5} className={classes.item + ' ' + classes.chart}>
            <MusicList />
          </Grid>
          <Grid item xs={7} className={classes.item + ' ' + classes.thumbnail}>
            right image
          </Grid>
        </Grid>
      </PageLayout>
    </PageTitle>
  )
}

export default ChartsPage
