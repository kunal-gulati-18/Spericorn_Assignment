
import './App.css';
import Component1 from './components/Component1';
import Component2 from  './components/Component2';
import Component3 from './components/Component3';
import {BrowserRouter as Router,Link,Route} from 'react-router-dom';

function App() {
  return (
    
    <div className="App">
     <Router>
       <Route path='/edit/:id'>
         <Component3/>
       </Route>
       <Route exact path="/">
     <Component1/>
     
     <Component2/>
     </Route>
     </Router>
    </div>


    

    
  );
}

export default App;
