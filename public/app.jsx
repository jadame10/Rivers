import React from "react";
import ReactDOM from "react-dom";
import	{	Router,		Route,	Link,
  IndexLink,		IndexRoute,	hashHistory
}	from	'react-router';


class App extends React.Component{
constructor(props){
  super(props);
  this.state = {
  search: this.props.search,
  data: [],
  rzeki: [],
  wojewodztwa: [],
  stacje: [],
  poziomy: [],
  x: [],
  y: []
  }
  this.handleOnChange = this.handleOnChange.bind(this);
  this.handleOnSubmit = this.handleOnSubmit.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount() {
fetch('https://danepubliczne.imgw.pl/api/data/hydro/').then((Response) => Response.json())
.then((findresponse) =>
{

this.setState({
  data:findresponse
})
})

}

handleOnChange(event) {
this.setState({search: event.target.value});
}

handleOnSubmit(event) {
  this.setState({search: event.target.value});
    event.preventDefault();
    for( let i = 0; i < this.state.data.length; i++){
      this.state.rzeki.push(this.state.data[i].rzeka);
      this.state.wojewodztwa.push(this.state.data[i].wojew\u00f3dztwo);
      this.state.stacje.push(this.state.data[i].stacja);



    if (this.state.rzeki[i]) {
         if (this.state.rzeki[i].toLowerCase().indexOf(this.state.search) > -1) {
            this.state.y[i] = this.state.rzeki[i] + " " + this.state.stacje[i] + ", ";
         }
       }
  }
}

handleSubmit(event) {
  this.setState({search: event.target.value});
    event.preventDefault();
    for( let i = 0; i < this.state.data.length; i++){
      this.state.rzeki.push(this.state.data[i].rzeka);
      this.state.wojewodztwa.push(this.state.data[i].wojew\u00f3dztwo);
      this.state.stacje.push(this.state.data[i].stacja);
      this.state.poziomy.push(this.state.data[i].stan_wody);


    if (this.state.stacje[i]){
         if (this.state.stacje[i].toLowerCase().indexOf(this.state.search) > -1) {
            this.state.x = this.state.stacje[i] + " " + this.state.rzeki[i] + " " + "woj." + this.state.wojewodztwa[i] + " " + this.state.poziomy[i] + " "+  "cm" ;
         }
       }
  }
}
Clear(evt){
this.setState({
  x: "",
  y: ''
})
}

render(){

  return(
    <div className = "wy">

    <h3 className = "text-center w3">Poziom wody polskich rzek.</h3>
    <h6 className = "text-center w3">Rzeki i stacje proszę wpisywać z małej ltery.
    <br />
    Po każdym wyszukaniu, proszę kliknąć przycisk "Wyczyść wyniki".
    </h6>
    <br /><br />
    <form className = "w2" onSubmit={this.handleOnSubmit}>
        <input type = "text" className = "s1" onChange = {this.handleOnChange} />
        <input className = "btn-primary" type="submit" value="wpisz rzekę" />
        </form>

        <h2 className = "wynik">{this.state.y}</h2>
    <form className = "w1" onSubmit={this.handleSubmit}>
        <input type = "text" className = "s1" onChange = {this.handleOnChange} />
        <input className = "btn-success" type="submit" value="wpisz stację" />
        </form>
        <h2>{this.state.search}</h2>
        <h2 className = "wynik">{this.state.x}</h2>

    <form className = "w0" onSubmit={this.Clear}>
        <input className ="btn-warning" type="submit" value="Wyczyść wyniki" />
        </form>





    </div>
  );
}

}

document.addEventListener("DOMContentLoaded", function(){
    ReactDOM.render(
    <div>
    <App />
    </div>,
		document.getElementById('app')

   );
});
