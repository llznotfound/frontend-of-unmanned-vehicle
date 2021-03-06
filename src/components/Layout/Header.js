import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import styles from './Header.less'
import Menus from './Menu'

const SubMenu = Menu.SubMenu

const Header = ({ user, logout ,switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu }) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  var theme = sessionStorage.getItem('theme')==null?'false':sessionStorage.getItem('theme')
  return (
    // null
    <div className={styles.header} style={{backgroundColor:theme=="false"?'#363636':'#fff'}}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars"/>
          </div>
        </Popover>
        : <div className={styles.button} onClick={switchSider}>
         <Icon className={styles.icon} type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      {  
      //注释掉右上角两个图标
      /*<div className={styles.rightWarpper}>
        <div className={styles.button}>
          <Icon type="mail" />
        </div>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu style={{
            float: 'right',
          }} title={< span > <Icon type="user" />
            {user.username} < /span>}
          >
            <Menu.Item key="logout">
              Sign out
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>*/
      }
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
