import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled from 'styled-components'
import Banner from 'src/components/Banner'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

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
    grid: {
      alignItems: 'center',
    },
  })
)

function ChartsPage() {
  const classes = useStyles()
  return (
    <PageTitle title="Icecream Music - Charts">
      <PageLayout>
        <Banner />
      </PageLayout>
    </PageTitle>
  )
}

export default ChartsPage
