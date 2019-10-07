
import React from 'react';
import axios from 'axios';
import './navProfile.css';
import Darrin from '../assets/images/DarrinDeal.jpg';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Playlists from '../components/Playlists';
import Posts from '../components/Posts';
import SpotifyApiTest from '../components/SpofityApiTest/SpotifyApiTest';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      activeTab: '1',
      spotifyInfo: {},
      accessToken: '',
    };
    this.onDrop = this.onDrop.bind(this);

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const params = this.props.location.state.info;
    // axios.post('https://soundbridge.herokuapp.com/has-spotify/' + params.spotifyRefreshToken)
    axios.post('http://localhost:4000/has-spotify/' + params.spotifyRefreshToken)
      .then(res => {
        this.setState({
          accessToken: res.data,
        }, () => {
          fetch('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': 'Bearer ' + this.state.accessToken,
            }
          }).then(res => res.json())
            .then(data => this.setState({ spotifyInfo: data }));
        });
      });
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const params = this.props.location.state.info;
    const user = this.state.spotifyInfo;
    const accessToken = this.state.accessToken;
    console.log('params: ', params);
    console.log('user: ', user);
    return (

      <div>

        {/* ----- Page Display Start ----- */}
        <div className="main-display-container">

          <div className="top-page-display-container">

            <div className="img-and-username-container row">

              <div className="profile-img-container ">
                <div className="profile-img">

                  <img id="profile-image" src={Darrin} alt="DarrinDeal" />
                </div>
                <div className="change-profile-img">
                  <p>Change</p>
                </div>
              </div>

              <div className="username-title ">
                <p>User</p>
                <h1>Darrin</h1>
              </div>

            </div> {/*----- End img-and-username-container ----- */}

            <div className="profile-nav-tabs">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Songs
                    </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Playlists
                    </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}
                  >
                    Posts
                    </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col className="song-col" sm="4">
                      <div className="songs" >Title</div>
                      <ul>
                        <li></li>
                      </ul>
                    </Col>
                    <Col className="song-col" sm="4">
                      <div className="songs" >Artist</div>
                      <ul>
                        <li></li>
                      </ul>
                    </Col>
                    <Col className="song-col" sm="4">
                      <div className="songs" >Date</div>
                      <ul>
                        <li></li>
                      </ul>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  {
                    !params.spotify ?
                    <SpotifyApiTest /> :
                    params.spotify && !accessToken ?
                    <h1>loading...</h1> :
                    <Playlists 
                    accessToken={accessToken}
                    />
                  }
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <Card body>
                        <CardTitle>Post Section</CardTitle>
                        <Posts userInfo={params} />
                        <Button className="profile-btn">Post</Button>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>


          </div> {/*----- top-page-display-container ----- */}

          <div className="bottom-page-container">

          </div>

        </div> {/*----- End Main display Container ----- */}

      </div>
    );
  }
}

