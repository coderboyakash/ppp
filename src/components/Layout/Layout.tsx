import React, { useState } from 'react'
import {
  Box,
  List,
  ListItem,
  Text,
  Flex,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Tooltip,
} from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { menuItems } from '../../utils/constants'
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go'
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.app.user)
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setIsOpen(false)
  }

  return (
    <Box>
      {isSidebarOpen && (
        <Box className={'sidebar'}>
          <Flex
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'row'}
            h={68}
          >
            <img src={'./assets/images/user.svg'} alt={'user'} />
            <Text pl={2} as={'strong'}>
              {userData?.name}
            </Text>
          </Flex>
          <Box mt={1}>
            <List
              display={'flex'}
              justifyContent={'center'}
              flexDir={'column'}
              py={2}
              spacing={1}
            >
              {menuItems?.map((item) => {
                return (
                  <ListItem
                    className={'menu-item'}
                    key={item?.id}
                    fontSize={'14px'}
                    color={
                      pathname.includes(item?.path) ? '#fff' : 'brand.black'
                    }
                    fontWeight={'700'}
                    display={'flex'}
                    alignItems={'center'}
                    gap={'20px'}
                    p={3}
                    px={8}
                    onClick={() => navigate(item?.path)}
                    cursor={'pointer'}
                    background={
                      pathname.includes(item?.path) ? '#9ad0f5' : 'transparent'
                    }
                  >
                    {React.cloneElement(item?.icon, {
                      style: {
                        fill: pathname.includes(item?.path) ? '#fff' : '#000',
                      },
                    })}
                    <span>{item.text}</span>
                  </ListItem>
                )
              })}
            </List>
          </Box>
        </Box>
      )}
      <Box
        h={'100vh'}
        ml={isSidebarOpen ? '252px' : '0px'}
        className={'layout-wrapper'}
      >
        <Box h="68px" className={'header'} borderBottom={'0.1px solid #ddd'}>
          {isSidebarOpen ? (
            <Tooltip label="Open Sidebar" placement="right" isOpen={isOpen}>
              <GoSidebarExpand
                size={24}
                onClick={handleToggleSidebar}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              />
            </Tooltip>
          ) : (
            <Tooltip label="Close Sidebar" placement="right" isOpen={isOpen}>
              <GoSidebarCollapse
                size={24}
                onClick={handleToggleSidebar}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              />
            </Tooltip>
          )}
          <Menu>
            <MenuButton>
              <AiOutlineUser />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  localStorage.removeItem('token')
                  navigate('/signin')
                }}
              >
                <AiOutlineLogout />
                &nbsp; Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box h={'calc(100vh - 68px)'}>
          <Box h={'100%'} overflowX={'auto'}>
            <Box h={'100%'} p={5}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout