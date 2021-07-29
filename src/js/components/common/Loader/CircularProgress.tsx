import {CircularProgress} from "@material-ui/core"
import {withStyles} from '@material-ui/core/styles';


interface IProps {
  color?: string;
}

export const Loader = ({color}: IProps) => {
  const StyledCircularProgress = withStyles({
    root: {
      color: color,
      width: '24px',
      height: '24px',
    }
  })(CircularProgress)

  return (
    <StyledCircularProgress size='' />
  )
}