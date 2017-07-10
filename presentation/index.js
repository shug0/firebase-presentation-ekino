// Import React
import  React                           from "react";
import Rebase                          from 're-base';
import firebase                        from 'firebase';
import { firebaseConf, firebaseIllus } from './config';
import preloader                       from "spectacle/lib/utils/preloader";

import './common.css';
import Terminal from "spectacle-terminal";

const firebaseApp = firebase.initializeApp(firebaseConf);
const base = Rebase.createClass(firebaseApp.database());

import PresentationSlide from './slides/PresentationSlide';
import ConnectionSlide   from './slides/ConnectionSlide';
import AnimalsResult     from './slides/AnimalsResult';
import ClickGame         from './slides/ClickGame';
import ClickGameResult   from './slides/ClickGameResult';

import authCodePath           from './codes/authCodePath';
import cloudFunctionsCodePath from './codes/cloudFunctionsCodePath';
import databaseCodePath       from './codes/databaseCodePath';

// Import Spectacle Core tags
import {
  Deck,
  Slide,
  Image,
  Text,
  List,
  CodePane,
  ListItem,
  Layout,
} from "spectacle";
import CodeSlide from 'spectacle-code-slide';

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#e74c3c",
  quartenary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

preloader(firebaseIllus);

export default class Presentation extends React.Component {

  constructor() {
    super();

    this.state = {
      users: {},
      stats: {},
    }
  }

  componentDidMount() {
    base.bindToState('users', {
      context: this,
      state: 'users',
    });
    base.syncState('stats', {
      context: this,
      state: 'stats',
    });
    this.lockCounter(false);
  }

  lockCounter = (state) => {
    this.setState({
      stats: {
        ...this.state.stats,
        lock: state,
      }
    })
  };

  render() {
    const { users, stats } = this.state;
    const green = {color: "#2ecc71"};
    return (
      <Deck transition={["zoom", "slide"]} progress="bar" progressColor="black" transitionDuration={500} theme={theme}>

        {/*|||||||||| 🔥 Firebase 🔥 ||||||||||| */}
        <Slide transition={["zoom"]} bgColor="primary">
          <PresentationSlide />
        </Slide>

        {/*|||||||||| 🔥 PREZ 🔥 ||||||||||| */}
        <Slide transition={["slide"]} maxWidth="700px" bgColor="primary">
          <Text textColor="#e74c3c" bold fit caps>Thomas Alberola</Text>
          <Text margin="0 0 30px" style={{fontWeight: '100'}} fit>Ingénieur front-end</Text>
          <Image width="30%" style={{borderRadius: 0 }} src={firebaseIllus.ekino} />
        </Slide>

        {/*|||||||||| Utilisateurs connectés ||||||||||| */}
        <Slide transition={["slide"]} bgColor="tertiary">
          <ConnectionSlide stats={stats} />
        </Slide>

        {/*|||||||||| Click challenge ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary"  maxWidth="1300px">
          <ClickGame users={users} lockCounter={this.lockCounter}
        />
        </Slide>

        <Slide transition={["spin"]} bgColor="tertiary" textColor="white"  maxWidth="1300px">
          <ClickGameResult users={users} lockCounter={this.lockCounter} />
        </Slide>

        {/*|||||||||| Firebase Products ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary"  maxWidth="1300px">
          <Text textAlign="left" className="Title">Fonctionnalités utilisées</Text>
          <List>
            <ListItem>Authentication</ListItem>
            <ListItem>Cloud Functions</ListItem>
            <ListItem>Realtime Database</ListItem>
            <ListItem>Hosting</ListItem>
          </List>
        </Slide>

        {/*|||||||||| AUTHENTIFICATION ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary">
          <Text className="Title">Firebase Auth</Text>
          <Image src={firebaseIllus.auth}/>
        </Slide>

        <CodeSlide
          transition={["spin"]}
          lang="js"
          scale="1.5"
          maxWidth="1300px"
          code={require("raw-loader!../assets/codes/auth.example")}
          ranges={authCodePath}
        />

       {/*|||||||||| CLOUD FUNCTIONS ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary" notes>
          <Text className="Title">Cloud Functions</Text>
          <Image src={firebaseIllus.cloud_functions}/>
        </Slide>

        <CodeSlide
          transition={["spin"]}
          lang="js"
          scale="1.5"
          maxWidth="1300px"
          code={require("raw-loader!../assets/codes/cloudFunction.example")}
          ranges={cloudFunctionsCodePath}
        />

        <Slide transition={["slide" ]} bgColor="primary">
          <Text className="Title">Deploy Cloud Functions</Text>
          <Terminal title="Terminal ☕ ️" output={[
            "$ firebase deploy",
            " ",
            "=== Deploying to 'best-1-db17d'...",
            " ",
            "deploying functions",
            "i  functions: ensuring necessary APIs are enabled...",
            "i  runtimeconfig: ensuring necessary APIs are enabled...",
            <div><span style={green}>✔  </span>runtimeconfig: all necessary APIs are enabled</div>,
            <div><span style={green}>✔  </span>functions: all necessary APIs are enabled</div>,
            "i  functions: preparing functions directory for uploading...",
            "i  functions: packaged functions (1.92 KB) for uploading",
            <div><span style={green}>✔  </span>functions: functions folder uploaded successfully</div>,
            "i  starting release process (may take several minutes)...",
            "i  functions: updating function registerUser...",
            <div><span style={green}>✔  </span>functions[registerUser]: Successful update operation.</div>,
            <div><span style={green}>✔  </span>functions: all functions deployed successfully!</div>,
            " ",
            <div><span style={green}>✔  </span>Deploy complete!</div>,
            " ",
            "Project Console: https://console.firebase.google.com/project/best-1-db17d/overview"
          ]}
          />
        </Slide>

        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary" maxWidth="1300px">
          <Text className="Title">Cloud Functions Admin</Text>
          <video width="1300px" loop autoPlay>
            <source src={require("file-loader!../assets/videos/cloud_functions.mp4")} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Slide>


       {/*|||||||||| REALTIME DATABASE ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary">
          <Text className="Title">Realtime Database</Text>
          <Image src={firebaseIllus.database}/>
        </Slide>

        <CodeSlide
          transition={["spin"]}
          lang="js"
          scale="1.5"
          maxWidth="1300px"
          code={require("raw-loader!../assets/codes/auth.example")}
          ranges={databaseCodePath}
        />

       {/*|||||||||| CLOUD HOSTING ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary">
          <Text className="Title">Cloud Hosting</Text>
          <Image src={firebaseIllus.hosting_ssd}/>
        </Slide>

        <Slide transition={["slide"]} bgColor="primary" textColor="primary" maxWidth="1200px">
          <Text className="Title">Deploy Hosting</Text>
          <Terminal title="Terminal ☕ ️" output={[
            "$ firebase deploy",
            " ",
            "=== Deploying to 'best-1-db17d'...",
            " ",
            "i  deploying hosting",
            "i  hosting: preparing public directory for upload...",
            <div><span style={green}>✔  </span>hosting: 2 files uploaded successfully</div>,
            " ",
            "i  starting release process (may take several minutes)...",
            <div><span style={green}>✔  </span>Deploy complete!</div>,
            " ",
            "Project Console: https://console.firebase.google.com/project/best-1-db17d/overview",
            <div>Hosting URL: <span style={green}>https://best-1-db17d.firebaseapp.com</span></div>,
          ]}
          />
        </Slide>

        {/*|||||||||| CLOUD STORAGE ||||||||||| */}
         <Slide transition={["slide"]} bgColor="primary" textColor="tertiary" notes>
           <Text className="Title">Cloud Storage</Text>
           <Image src={firebaseIllus.cloud_storage}/>
         </Slide>

        {/*------------------- MOBILE ------------------- */}
        {/*|||||||||| NATIVE FUNCS ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary" maxWidth="1200px">
          <Text className="Title">Fonctionnalités pour les applications natives</Text>
          <Image src={firebaseIllus.natives}/>
        </Slide>

        {/*|||||||||| ANALYTICS ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary">
          <Text className="Title">Google Analytics</Text>
          <Image src={firebaseIllus.google_analytics_segmetns}/>
        </Slide>

        {/*|||||||||| MESSAGE PUSH ||||||||||| */}
         <Slide transition={["slide"]} bgColor="primary" textColor="tertiary">
           <Text className="Title">Push</Text>
           <Image src={firebaseIllus.push_prog}/>
         </Slide>

        {/*|||||||||| DEEP LINK ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary" maxWidth="1300px">
          <Text className="Title">Native link</Text>
          <Layout>
            <Image width="50%" height="100%" src={firebaseIllus.deep_link} margin="10px"/>
            <Image width="50%" height="100%" src={firebaseIllus.deep_link_send_to_phone} margin="10px"/>
          </Layout>
        </Slide>

        {/*|||||||||| REMOTE CONFIG ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary" notes>
          <Text className="Title">Remote Config</Text>
          <Image src={firebaseIllus.remote_config}/>
        </Slide>


        {/*|||||||||| CRASH REPORTING ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary" maxWidth="1300px">
          <Text className="Title">Crash Reporting</Text>
          <Layout>
            <Image width="50%" height="100%" src={firebaseIllus.crash} margin="10px"/>
            <Image width="50%" height="100%" src={firebaseIllus.crash_bad_ratings} margin="10px"/>
          </Layout>
        </Slide>

        {/*|||||||||| PERFORMANCE MONITORING ||||||||||| */}
       <Slide transition={["slide"]} bgColor="primary" textColor="tertiary" maxWidth="1300px">
         <Text className="Title">Performances Monitoring</Text>
         <Layout>
           <Image width="50%" height="100%" src={firebaseIllus.perf_graphs} margin="10px"/>
           <Image width="50%" height="100%" src={firebaseIllus.perfs_connectivity} margin="10px"/>
         </Layout>
       </Slide>

        {/*|||||||||| TEST LAB ||||||||||| */}
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary" maxWidth="1300px">
          <Text className="Title">Test Lab</Text>
          <Layout>
            <Image width="50%" height="100%" src={firebaseIllus.test_lab_robot} margin="10px"/>
            <Image width="50%" height="100%" src={firebaseIllus.test_lab_report} margin="10px"/>
          </Layout>
        </Slide>

      {/*|||||||||| Conclusion  ||||||||||| */}
      <Slide transition={["slide"]} bgColor="primary" textColor="tertiary">
        <AnimalsResult users={users} />
      </Slide>

      </Deck>
    );
  }
}
