import { makeStyles } from '@material-ui/core'
import _ from 'lodash'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { openSansFont } from '../../App'

export type LeftNavItem = {
  img?: string
  element?: JSX.Element
  text: string
  //callbackFn: Function
  id?: string
}

type LeftNavProps = {
  items: LeftNavItem[]
  activeIndex?: number
  activeColor?: string
  changeIndexCallbackFn?: Function
  isLink?: boolean
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
      '& a': {
        textDecoration: 'none',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '30px 15px 25px 30px',
      },
    },

    '& $linkLi': {
      padding: '0',
    },
  },
  linkLi: {},
  navItem: {
    width: '300px',
    padding: '30px 10px 10px 30px',
    borderBottom: ' 1px solid #EEEEEE',
  },
  selected: {
    borderLeft: '7px solid #3cddd3',
    backgroundColor: '#fafafa',
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
  changeIndexCallbackFn,
  isLink = false,
}: LeftNavProps) => {
  const classes = useStyles()

  const Inner: React.FunctionComponent<{
    item: LeftNavItem
    isActive: boolean
    isLink: boolean
  }> = ({ item, isActive }) => {
    const inner = (
      <>
        {isActive && !isLink && (
          <div
            className={classes.activeNavMarker}
            style={{ backgroundColor: activeColor }}
          ></div>
        )}
        {item.img && <img src={item.img}></img>}
        {item.element && <div className="img">{item.element}</div>}
        <span>{item.text}</span>
      </>
    )

    return isLink ? (
      <NavLink to={item.id!} activeClassName={classes.selected}>
        {inner}
      </NavLink>
    ) : (
      inner
    )
  }

  return (
    <ul className={classes.root}>
      {items.map((item, index) => (
        <li
          className={isLink ? classes.linkLi : ''}
          key={`nav${index}`}
          onClick={() =>
            changeIndexCallbackFn
              ? changeIndexCallbackFn(index, item.id)
              : _.noop
          }
          style={activeIndex === index ? { backgroundColor: '#FCFCFC' } : {}}
        >
          <Inner item={item} isActive={activeIndex === index} isLink={isLink} />
        </li>
      ))}
    </ul>
  )
}

export default LeftNav
