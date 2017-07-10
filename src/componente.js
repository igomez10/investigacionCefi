class Componente extends React.Component
{
  constructor (props)
  {
    super(props);
  }

  afunction()
  {
    var pQuery = document.getElementById('inputText').value
    // console.log(pQuery)
    axios.get(pQuery)
    .then(function(res)
    {

      var researchList = res.data.map(function(researchItem)
      {
        console.log(researchItem.nombre);
        return  <li>{researchItem.nombre}</li> ;
      })
      console.log(researchList);
      document.getElementById('researchList').innerHTML = researchList;
    })
    .catch(function(err)
    {
      console.log(err);
    });
  }


  render()
  {
    var lista = axios.get('INVESTIGACIONES')
    .then( function(res){
      res.data.map(function(researchItem){
        return  <li>{researchItem.nombre}</li> ;
      })

      return (
        <div>
          <h1>Hello, world!</h1>
          <h1>Aloha</h1>
          <h1 id="content">LOADING</h1>
          <input
            type="text" placeholder='solicitud'
            id='inputText'
            defaultValue='INVESTIGACIONES'>
          </input>
          <button onClick={this.afunction}>BUSCAR</button>
          <ul id='researchList'>
            {lista}
          </ul>
        </div>
      );
    }
    .catch(function(err){
      console.log(err)
    })
  }
}
