import Drawer from "./Drawer"
import AddNote from "./addnote"
import Notes from './Notes'
import './Drawer.css'
const Home = (props) => {
  const { showAlert } = props;
  
  return (
    <div className = 'app'>
      <Drawer showAlert={showAlert}/>
      {/* <AddNote showAlert={showAlert} /> */}
      {/* <Notes showAlert={showAlert} /> */}
    </div>
  )
}

export default Home
