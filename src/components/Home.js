import Drawer from "./Drawer";
import AddNote from "./addnote";
import Notes from './Notes';

const Home = (props) => {
  const { showAlert } = props;
  return (

    <div className='app'>
      <Drawer showAlert={showAlert} />
    </div>

  );
};

export default Home;