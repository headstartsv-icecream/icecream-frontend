import { Dispatch, SetStateAction } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const gif = require('../../public/equalizer.gif')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)

type Props = {
  isOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  setRecording: Dispatch<SetStateAction<boolean>>
}

export default function OverlayModal({ isOpen, setModalOpen, setRecording }: Props) {
  const classes = useStyles()

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={() => {
          setModalOpen(false)
          setRecording(false)
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Hearing your music...</h2>
            <img src={gif} alt="Searching your music..." />
            <p id="transition-modal-description">react-transition-group animates me.</p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModalOpen(false)
                setRecording(false)
              }}
            >
              취소하기
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
