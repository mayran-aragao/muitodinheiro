import React, {useState} from 'react';
import CustomModal from './components/ModalCustom';
import {
  Container,
  Header,
  TextBox,
  Text,
  ClientInput,
  ContentBox,
  BoxDate,
  TaxBox,
  DateText,
  BoxChange,
  CoinInput,
  ValorInput,
  CambioButton,
  Seletor,
  CotaInput,
  TaxaView,
  Botao,
  SearchInput,
  OperationScroll,
  OperationBox,
  Box,
  Label,
  LabelValue
} from './Style';


const App = () => {
  //hooks
  const [name, setName] = useState('');
  const [moedaOrigem, setMoedaOrigem] = useState('REAL');
  const [moedaDestino, setMoedaDestino] = useState('USD');
  const [valorOrigem , setValorOrigem] = useState('');
  const [valorDestino, setValorDestino] = useState('');
  const [operation, setOperation] = useState([]);
  const [taxa, setTaxa] = useState('10');
  const [taxaCobrada, setTaxaCobrada] = useState('');
  const [valorUSD, setValorUSD] = useState('');
  const [valorEURO, setValorEURO] = useState('');
  const [valorCAD, setValorCAD] = useState('');
  const [modalVisible , setModalVisible] = useState(false);
  //configurando a data
  let data = new Date();
  let dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();

  dia = (dia<10)?'0'+dia:dia;
  mes = (mes<10)?'0'+mes:mes;

  let dFormated = `${dia}-${mes}-${ano}`;
    //função do botao converter
  const ChangeAction = () => {

    let valor = '';
    let tax = '';
    let valorCotação = '';
    let taxResultante = '';
    let taxString ='';
    let valorResultante =''; 
    if(valorOrigem == '' || name =='' || taxa == '' && (valorUSD =='' || valorEURO =='' || valorCAD=='') ){
      alert("Você precisa preencher os campos principais e a cotação da moeda de destino");
      return;
    }else if(moedaOrigem =='REAL' && moedaDestino =='USD' && valorUSD != '' ){
      valor = parseFloat(valorOrigem.replace(/,/,'.')).toFixed(2); //atribuindo o valor de origim a uma variavel
      tax = parseFloat(taxa.replace(/,/,'.')).toFixed(2);
      valorCotação = parseFloat(valorUSD.replace(/,/,'.')).toFixed(2);
      taxResultante  = (valor * (tax/100)).toFixed(2);
      taxString = taxResultante.toString();
      valorResultante =( (valor-taxResultante)/valorCotação).toFixed(2);
      valorResultante = valorResultante.toString();
             
      }else if(moedaOrigem =='REAL' && moedaDestino =='EURO' && valorEURO != '' ){
        valor = parseFloat(valorOrigem.replace(/,/,'.')).toFixed(2); //atribuindo o valor de origim a uma variavel
        tax = parseFloat(taxa.replace(/,/,'.')).toFixed(2);
        valorCotação = parseFloat(valorEURO.replace(/,/,'.')).toFixed(2);
        taxResultante  = (valor * (tax/100)).toFixed(2);
        taxString = taxResultante.toString();
        valorResultante =( (valor-taxResultante)/valorCotação).toFixed(2);
        valorResultante = valorResultante.toString();

        }else if(moedaOrigem =='REAL' && moedaDestino =='CAD' && valorCAD != '' ){
          valor = parseFloat(valorOrigem.replace(/,/,'.')).toFixed(2); //atribuindo o valor de origim a uma variavel
          tax = parseFloat(taxa.replace(/,/,'.')).toFixed(2);
          valorCotação = parseFloat(valorCAD.replace(/,/,'.')).toFixed(2);
          taxResultante  = (valor * (tax/100)).toFixed(2);
          taxString = taxResultante.toString();
          valorResultante =( (valor-taxResultante)/valorCotação).toFixed(2);
          valorResultante = valorResultante.toString();
          }
  
  

    let op = {
      nome: name,
      moedaOrigem:moedaOrigem,
      moedaDestino: moedaDestino,
      valorOrigem:parseFloat(valorOrigem.replace(/,/,'.')).toFixed(2),
      valorDestino: parseFloat(valorResultante.replace(/,/,'.')).toFixed(2),
      taxa: taxa,
      taxaCobrada: taxString,
      data: dFormated,
    };
    setTaxaCobrada(taxString);
    setValorDestino(valorResultante);
    setValorOrigem(valor);
  
    
    operation.push(op);
    setOperation(operation);
    console.log(operation);
    console.log(operation.length);
};

const OpenModal = () => {
  setModalVisible(true);
  
}

  return (
    <Container>
      <CustomModal visible={modalVisible} closeAction={()=>setModalVisible(false)}>
        <SearchInput placeholder="Pesquisar relatório" />
        <OperationScroll >
          {operation.map((item,index)=>{
            return(
            <OperationBox key={index}>
              <Box>
                <Label>Cliente: </Label>
                <Label>Data: </Label>
              </Box>
              <Box>
              <LabelValue>{item.nome}</LabelValue>
              <LabelValue>{item.data}</LabelValue>
              </Box>
              <Box>
                <Label>Moeda de origem: </Label>
                <Label>Moeda de destino: </Label>
              </Box>
              <Box>
              <LabelValue>{item.moedaOrigem}</LabelValue>
              <LabelValue>{item.moedaDestino}</LabelValue>
              </Box>
              <Box>
                <Label>Valor de origem: </Label>
                <Label>Valor de destino: </Label>
              </Box>
              <Box>
              <LabelValue>{item.valorOrigem}</LabelValue>
              <LabelValue>{item.valorDestino}</LabelValue>
              </Box>
              <Box>
                <Label>Taxa em %: </Label>
                <Label>Taxa em reais: </Label>
              </Box>
              <Box>
              <LabelValue>{item.taxa}%</LabelValue>
              <LabelValue>R${item.taxaCobrada}</LabelValue>
              </Box>
            </OperationBox>
            );
            
          })}

        </OperationScroll>
      </CustomModal>
      <Header>Muito Dinheiro Cambio</Header>
      <Text>Nome Do Cliente:</Text>
      <ClientInput placeholder="Digite o nome do cliente" value={name} onChangeText={(n)=>setName(n)}/>
      <TextBox>
        <Text>Data da operação:</Text>
        <Text>Taxa de cambio:</Text>
      </TextBox>
      <ContentBox>
        <BoxDate>
          <DateText>{dia}/{mes}/{ano}</DateText>
        </BoxDate>
        <TaxBox
          keyboardType="numeric" 
          placeholder="Digite a Taxa em %" 
          value={taxa}
          onChangeText={(t)=>setTaxa(t)}
          maxLength={5} //limitando o numero de caracteres inseridos
         />
      </ContentBox>
      <BoxChange>
        <CoinInput>
          <Seletor
            selectedValue={moedaOrigem}
            onValueChange={(value) => setMoedaOrigem(value)}>
            <Seletor.Item label="REAL" value="REAL"/>
            <Seletor.Item label="USD" value="USD"/>
            <Seletor.Item label="EURO" value="EURO"/>
            <Seletor.Item label="CAD" value="CAD"/>
          </Seletor> 
        </CoinInput> 
        <ValorInput keyboardType="numeric" placeholder="Valor original" value={valorOrigem} onChangeText={(v)=>setValorOrigem(v)}/>
        <CoinInput>
          <Seletor
            selectedValue={moedaDestino}
            onValueChange={(value) => setMoedaDestino(value)}>
            <Seletor.Item label="USD" value="USD"/>
            <Seletor.Item label="EURO" value="EURO"/>
            <Seletor.Item label="CAD" value="CAD"/>
            <Seletor.Item label="REAL" value="REAL"/>
          </Seletor>
        </CoinInput>
        <ValorInput  keyboardType="numeric" placeholder="Valor destino" value={valorDestino} onChangeText={(v)=>setValorDestino(v)}/>
        <CambioButton onPress={ChangeAction} underlayColor="#999">
          <Text style={{color:"#fff"}} >Converter</Text>
        </CambioButton>
      </BoxChange>
      <Text style={{alignSelf:"flex-start"}}>Taxa Cobrada:</Text>
        <TaxaView>
          <Text  style={{alignSelf:"flex-start"}} >$ {taxaCobrada}</Text>
        </TaxaView>
      <TextBox>
        <Text style={{textAlign:"center"}}>USD</Text>
        <Text>EURO</Text>
        <Text>CAD</Text>
      </TextBox>  
      <ContentBox>
        <CotaInput keyboardType="numeric" placeholder="Cotação" value={valorUSD} onChangeText={(v)=>setValorUSD(v)} />
        <CotaInput keyboardType="numeric" placeholder="Cotação" value={valorEURO} onChangeText={(v)=>setValorEURO(v)} />
        <CotaInput keyboardType="numeric" placeholder="Cotação" value={valorCAD} onChangeText={(v)=>setValorCAD(v)} />
      </ContentBox>
      <Text style={{fontSize:12, alignSelf:"flex-start"}}>*Os Valores sao baseados no Real. Ex:USD = R$5,25</Text>
    
      <Botao underlayColor="#191970" onPress={OpenModal}>
        <Text style={{color:"#fff", marginTop:0}}>Relatórios</Text>
      </Botao>

      
    </Container>
  );
}


export default App;

