import styled from 'styled-components'
import { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0.5),
      minWidth: 120,
      width: 300,
      fontSize: 400,
      borderRadius: 30,
    },
    selectEmpty: {
      marginTop: theme.spacing(4),
      width: 700,
    },
    container: {
      minHeight: '50vh',
      paddingTop: '4rem',
      paddingBottom: '1rem',
      paddingLeft: '2rem',
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 3fr 1fr',
      background: 'linear-gradient(to bottom, #0bf, #ecd5ec)',
    },
    item: {
      justifyContent: 'flex-start',
      padding: '0.5rem',
      // border: '2px solid #aaa',
    },
    largeButton: {
      width: 130,
      height: 130,
    },
    largeIcon: {
      fontSize: 120,
    },
    first: {
      height: '10vh',
    },
    second: {
      height: '30vh',
    },
    third: {
      height: '10vh',
    },
    chip: {
      fontSize: 20,
      height: 50,
      size: 'medium',
      borderRadius: 30,
    },
    typography: {
      color: '#fff',
      fontWeight: 'bold',
    },
  })
)

function Banner() {
  const classes = useStyles()
  const [country, setCountry] = useState('')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(event.target.value as string)
  }

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  return (
    <Grid container direction="column" justify="space-around" className={classes.container}>
      <Grid item className={classes.item + ' ' + classes.first}>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={country}
            onChange={handleChange}
            label="Country"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Korea</MenuItem>
            <MenuItem value={20}>America</MenuItem>
            <MenuItem value={30}>France</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container className={classes.second} alignItems="center">
        <Grid item className={classes.item}>
          <IconButton className={classes.largeButton}>
            <PlayCircleFilled className={classes.largeIcon} />
          </IconButton>
        </Grid>
        <Grid item className={classes.item}>
          <Typography variant="h5" className={classes.typography}>
            대한민국
          </Typography>
          <Typography variant="h2" className={classes.typography}>
            TOP 200
          </Typography>
          <Typography variant="h5" className={classes.typography}>
            이번 주에 대한민국에서 가장 많이 재생된 트랙
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.first} alignItems="center">
        <Grid item className={classes.item}>
          <Chip label="Top 200  " className={classes.chip} />
        </Grid>
        <Grid item className={classes.item}>
          <Chip
            onDelete={handleDelete}
            deleteIcon={<ExpandMoreIcon />}
            label="도시"
            className={classes.chip}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Banner
