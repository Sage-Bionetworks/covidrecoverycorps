import React from 'react'
import { makeStyles } from '@material-ui/core'
import { openSansFont } from '../../App'

export type LeftNavItem = {
  img?: string
  element?: JSX.Element
  text: string
  callbackFn: Function
}

type LeftNavProps = {
  items: LeftNavItem[]
  activeIndex?: number
  activeColor?: string
  changeIndexCallbackFn: Function
}

export const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: '0px 8px 37px -21px rgba(138,134,138,1)',

    listStyle: 'none',
    margin: '0',
    listStyleType: 'none',
    padding: '0',

    '& li': {
      position: 'relative',
      backgroundColor: '#fff',
      width: '300px',
      padding: '30px 15px 25px 30px',
      borderBottom: ' 1px solid #EEEEEE',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '& span': {
        fontFamily: openSansFont,
        fontWeight: 600,
        fontSize: '1.6rem',
        lineHeight: '2.5rem',
        color: '#3A3A3A',
      },

      [theme.breakpoints.down('md')]: {
        width: '100%',
      },

      '& img, & .img ': {
        marginRight: '1.6rem',
        width: '4rem',
      },
    },
  },
  navItem: {
    width: '300px',
    padding: '30px 10px 10px 30px',
    borderBottom: ' 1px solid #EEEEEE',
  },

  activeNavMarker: {
    width: '7px',
    position: 'absolute',
    height: '100%',
    top: '0px',
    left: '0px',

    borderBottom: '1px solid #EEEEEE',
  },
}))
export const LeftNav: React.FunctionComponent<LeftNavProps> = ({
  items,
  activeIndex,
  activeColor,
  changeIndexCallbackFn
}: LeftNavProps) => {
  const classes = useStyles()


  return (
    <ul className={classes.root}>
      {items.map((item, index) => (
        <li key={`nav${index}`}
          onClick={() => changeIndexCallbackFn(index)}
          style={
            activeIndex === index ? { backgroundColor: '#FCFCFC' } : {}
          }
        >
          {activeIndex === index && (
            <div
              className={classes.activeNavMarker}
              style={{ backgroundColor: activeColor }}
            ></div>
          )}
          {item.img && <img src={item.img}></img>}
          {item.element && <div className='img'>{item.element}</div>}
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  )
}

export default LeftNav
