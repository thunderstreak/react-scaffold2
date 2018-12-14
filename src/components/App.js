import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable';
import {Popover, NavBar, Icon} from 'antd-mobile';

import 'STYLES/app.css';
import 'STYLES/main.less';
import 'antd-mobile/dist/antd-mobile.css';

// 基于路由的代码分隔
const Loading = () => <div>Loading</div>;
const Entry = Loadable({
    loader  :() => import('./entry'),
    loading :Loading
});
const Home = Loadable({
    loader  :() => import('./home'),
    loading :Loading
});
const About = Loadable({
    loader  :() => import('./about'),
    loading :Loading
});
const Topics = Loadable({
    loader  :() => import('./topics'),
    loading :Loading
});
const Products = Loadable({
    loader  :() => import('./views/Products'),
    loading :Loading
});
const Lifecycle = Loadable({
    loader  :() => import('./views/Lifecycle'),
    loading :Loading
});
const Higher = Loadable({
    loader  :() => import('./higher/CartItem'),
    loading :Loading
});
const RenderProp = Loadable({
    loader  :() => import('./RenderProps/MouseTracker'),
    loading :Loading
});
const Counter = Loadable({
    loader  :() => import('./redux/counter/counterPanel'),
    loading :Loading
});
const reduxTest = Loadable({
    loader  :() => import('./redux/test/index'),
    loading :Loading
});
const Fetch = Loadable({
    loader  :() => import('./views/fetch'),
    loading :Loading
});
const Toast = Loadable({
    loader  :() => import('./Dialog/Dialog'),
    loading :Loading
});

/*
* redux
* */



const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt=""/>;

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            msg: 'App',
            visible: false,
            selected: ''
        };
    }

    onSelect(opt) {
        this.setState({
            visible: false,
            selected: opt.props.value
        })
    }

    handleVisibleChange(visible) {
        this.setState({visible})
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => history.go(-1)}
                    rightContent={[
                        <Popover
                             key="1"
                             mask
                             overlayClassName="fortest"
                             overlayStyle={{color: 'currentColor'}}
                             visible={this.state.visible}
                             overlay={[
                                 (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
                                 (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{whiteSpace: 'nowrap'}}>My Qrcode</Item>),
                                 (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                                     <span style={{marginRight: 5}}>Help</span>
                                 </Item>),
                             ]}
                             align={{
                                 overflow: {adjustY: 0, adjustX: 0},
                                 offset: [-10, 0],
                             }}
                             onVisibleChange={this.handleVisibleChange.bind(this)}
                             onSelect={this.onSelect.bind(this)}
                        >
                            <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                <Icon type="ellipsis"/>
                            </div>
                        </Popover>
                    ]}
                >NavBar</NavBar>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/topics" component={Topics}/>
                        <Route path="/entry" component={Entry}/>
                        <Route path="/products" component={Products}/>
                        <Route path="/higher" component={Higher}/>
                        <Route path="/renderProp" component={RenderProp}/>
                        <Route path="/lifecycle" component={Lifecycle}/>
                        <Route path="/counter" component={Counter}/>
                        <Route path="/reduxTest" component={reduxTest}/>
                        <Route path="/fetch/:id" component={Fetch}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}