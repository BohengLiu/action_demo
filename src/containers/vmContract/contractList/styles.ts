import { createStyles } from '@material-ui/core/styles'
import CreateImg from '@/images/create_contract.png'
import sCreateImg from '@/images/create_contract_small.png'
import addCircleImg from '@/images/add-circle-default.png'
import detailImg from '@/images/detail.png'
import detailHoverImg from '@/images/detail-hover.png'
import addCircleHoverImg from '@/images/add-circle-hover.png'
import { textOverflow, grayColor, materialButton } from '@/styles/appStyle'

const styles = createStyles({
  root: {
    padding: '0',
    position: 'relative'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    width: '100%',
    display: 'inline-block',
    padding: '0 5px',
    // marginTop: '32px',
    // marginBottom: '36px',
    '& img': {
      margin: '0 24px'
    },
    '& span': {
      fontWeight: 'bold',
      cursor: 'pointer',
      float: 'left',
      '&:hover': {
        opacity: 0.7
      }
    }
  },
  addCircle: {
    display: 'inline-block',
    fontSize: 22,
    width: 22,
    height: 22,
    cursor: 'pointer',
    float: 'right',
    marginTop: '2px',
    background: `url(${addCircleImg}) no-repeat`,
    '&:hover': {
      background: `url(${addCircleHoverImg}) no-repeat`
    }
  },
  noContract: {
    width: '128px',
    position: 'absolute',
    left: '172px',
    top: '127px',
    '& span': {
      textAlign: 'center',
      display: 'block',
      color: 'rgba(197,197,199,1)',
      transform: 'translateY(-20px)',
      fontSize: '14px'
    }
  },
  row: {
    // height: '48px',
    width: '100%',
    height: '66px',
    marginBottom: '10px',
    padding: '0 5px',
    backgroundColor: 'rgba(248,251,252,1)',
    color: '#999',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(229,229,229,1)',
    borderRadius: '4px'
  },
  rowLeft: {
    height: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: '10px'
  },
  address: {
    fontWeight: 'bold',
    display: 'inline-block',
    fontSize: '14px',
    cursor: 'pointer'
  },
  copy: {
    display: 'inline-block',
    width: 12,
    height: 14,
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    margin: '-10px 4px 0',
    '& img': {
      width: 12,
      height: 14
    }
  },
  date: {
    textAlign: 'left',
    fontSize: '12px',
    height: '20px',
    lineHeight: '20px',
    verticalAlign: 'bottom'
  },
  rowRight: {},
  detail: {
    width: '28px',
    height: '28px',
    marginRight: '13px',
    background: `url(${detailImg})`,
    cursor: 'pointer',
    '&:hover': {
      background: `url(${detailHoverImg})`
    }
  },
  link: {
    position: 'absolute',
    top: '170px',
    left: '50%',
    transform: 'translate(-50%)',
    textDecoration: 'none',
    backgroundImage: `url(${CreateImg})`,
    paddingTop: '86px',
    backgroundPosition: 'top, center',
    backgroundRepeat: 'no-repeat',
    color: grayColor,
    '&:hover': {
      opacity: 0.7
    }
  },
  smallLink: {
    position: 'absolute',
    bottom: '0px',
    right: '20px',
    textDecoration: 'none',
    backgroundImage: `url(${sCreateImg})`,
    paddingLeft: '20px',
    fontWeight: 'bold',
    backgroundRepeat: 'no-repeat',
    color: grayColor,
    '&:hover': {
      opacity: 0.7
    }
  },
  contractsList: {
    // height: '430px',
    width: '100%',
    marginTop: '5px',
    paddingRight: '5px',
    height: '380px',
    backgroundColor: '#fff',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#ddd',
      borderRadius: '2px'
    }
  },

  success: {
    color: '#000'
  },
  item: {
    display: 'inline-block',
    fontSize: '12px',
    // width: '14%',
    textAlign: 'center',
    fontWeight: 400
    // verticalAlign: 'top',
  },
  overflow: {
    ...textOverflow
  },
  btn: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 25,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ...materialButton,
    '& span': {
      display: 'blcok',
      width: 4,
      height: 4,
      marginRight: 4,
      borderRadius: '100%',
      background: grayColor
    }
  },
  pagination: {
    position: 'absolute',
    width: '844px',
    bottom: 15,
    textAlign: 'center',
    '& ul': {
      display: 'inline-block',
      '& li': {
        outline: 'none'
      }
    }
  }
})

export default styles
