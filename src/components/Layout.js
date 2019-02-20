import React, { useState} from 'react'
import {Icon, Menu, Label, Segment, Sidebar, Grid,} from 'semantic-ui-react';
import {Route, NavLink, BrowserRouter as Router, Switch} from 'react-router-dom'

import AccountManager from './account-manager/'
import MoneyTransfer from './money-transfer/';

const buttonStyle = {
    backgroundColor: '#0080ff',
    cursor: 'pointer'
};

const Layout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleMenuClick = () => setSidebarVisible(!sidebarVisible);

    return (
        <Router>
            <div>
                <Menu inverted attached="top" style={{backgroundColor: '#0080ff'}}>
                    <Menu.Item onClick={handleMenuClick} >
                        <Icon name="sidebar"/> Menu
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item><Label inverted style={{backgroundColor: '#0080ff'}}>John Doe</Label>
                        </Menu.Item>
                        <Menu.Item>
                            <Icon style={buttonStyle} name='setting' />
                        </Menu.Item>
                        <Menu.Item>
                            <Label color={'red'}>
                                <Icon name='mail' /> 23
                            </Label>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Sidebar.Pushable as={Segment} attached="bottom">
                    <Sidebar style={{backgroundColor: 'gold'} }
                             as={Menu}
                             animation={'push'}
                             direction={'left'}
                             icon='labeled'
                             vertical
                             visible={sidebarVisible}
                             width='thin'
                    >
                        <Menu.Item as={NavLink} to='/accountManager'><Icon name="edit"/>Account Manager</Menu.Item>
                        <Menu.Item as={NavLink} to='/moneyTransfer'><Icon name="shuffle"/>Money Transfer</Menu.Item>

                    </Sidebar>

                    <Sidebar.Pusher dimmed={false}>
                        <Segment basic style={{height: '800px'}}>
                            <br/>
                            <br/>
                            <Grid columns={2}>
                                <Grid.Column width={1}></Grid.Column>
                                <Grid.Column width={15}>
                                    <Switch>
                                        <Route path="/accountManager" component={AccountManager} />
                                        <Route path="/moneyTransfer" component={MoneyTransfer} />
                                    </Switch>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        </Router>
    )
};

export default Layout;

