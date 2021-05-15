import React, {useState} from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
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
  LabelValue,
  FilterButton,
  DateInput,
  FindImage
} from './Style';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


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
  const [dataFormatada, setDataFormatada] = useState('');
  const [valorUSD, setValorUSD] = useState('');
  const [valorEURO, setValorEURO] = useState('');
  const [valorCAD, setValorCAD] = useState('');
  const [modalVisible , setModalVisible] = useState(false);
  const [scrollVisible , setScrollVisible] = useState(true);
  const [filtro, setFiltro] = useState([]);
  const [dataInit, setDataInit] =  useState('');
  const [dataFim, setDataFim] = useState('');
  const [totalOp, setTotalOp] = useState(0);
  const [totalTaxas, setTotalTaxas] = useState(0);
  

  //configurando a data
  let data = new Date();
  let dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();

  dia = (dia<10)?'0'+dia:dia;
  mes = (mes<10)?'0'+mes:mes;

  let dFormated = `${dia}/${mes}/${ano}`;
  //setDataFormatada(dFormated);


  //função do botao converter, faz o calculo de conversao das moedas e cria no array o historico de operações
  const ChangeAction = () => {
    //criando as variaveis de uso nos calculos de conversao
    let valor = '';
    let tax = '';
    let valorCotação = '';
    let taxResultante = '';
    let taxString ='';
    let valorResultante =''; 
    //conversão
    if(valorOrigem == '' || name =='' || taxa == '' || (valorUSD =='' && valorEURO =='' && valorCAD=='') ){
      alert("Você precisa preencher os campos principais e a cotação da moeda de destino");
      return;
    }
    if(moedaOrigem =='REAL' && moedaDestino =='USD' && valorUSD != '' ){
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
    } else {
      alert("Você precisa preencher os de cotação da moeda de destino");
      return;
    }
    //convertendo a data e criando o timestamp da mesma
    let newDate = dataFormatada?dataFormatada:dFormated;
    newDate = newDate.split("/");
    let timestamp = newDate[1]+"/"+newDate[0]+"/"+newDate[2];
    timestamp = new Date(timestamp).getTime();
      
    //setando valor total de operações
    let valorOp = parseFloat(totalOp);
    let value = parseFloat(valor);
    let totalOperacao = (valorOp + value).toFixed(2);
    setTotalOp(totalOperacao);
    
    //setando valor total de taxas cobradas
    let valorTax = parseFloat(totalTaxas);
    let valueResult = parseFloat(taxResultante);
    let taxasTotal = (valorTax + valueResult).toFixed(2);
    setTotalTaxas(taxasTotal);

    //criando variavel para preencher o array    
    let op = {
      nome: name,
      moedaOrigem:moedaOrigem,
      moedaDestino: moedaDestino,
      valorOrigem:valor,
      valorDestino: parseFloat(valorResultante.replace(/,/,'.')).toFixed(2),
      taxa: taxa,
      taxaCobrada: taxString,
      data: dataFormatada?dataFormatada:dFormated,
      timestamp: timestamp,
    };
    //setando novos valores nos hookers e preenchendo vetor com os dados
    setTaxaCobrada(taxString);
    setValorDestino(valorResultante);
    setValorOrigem(valor);
  
    operation.push(op);
    setOperation(operation);
    
    
};
  //função para abrir o model
  const OpenModal = () => {
    setModalVisible(true);
  
  }
  //função para fechar o model e mostrar o relatorio completo
  const CloseModel = () => {
    setScrollVisible(true);
    setModalVisible(false);
  }
  //função para buscar por nome
  const SearchName = (n) => {
    let lista = [...operation];
    if(!n){
      alert("Você precissa digitar um nome");
      return;
    }
    lista = lista.filter(i=>i.nome == n);
    setFiltro(lista);
    setScrollVisible(false);
  }

  //função para buscar pela data
  const SearchData = (dataInicio, dataFim)=> {
    let lista = [...operation];

    //timestamp da data inicial

    let novaDataInit = dataInicio;
    novaDataInit = novaDataInit.split("/");
    let minTimeStamp = novaDataInit[1]+"/"+novaDataInit[0]+"/"+novaDataInit[2];
    minTimeStamp = new Date(minTimeStamp).getTime();

    //timestamp da data final

    let novaDataFim = dataFim;
    novaDataFim = novaDataFim.split("/");
    let maxTimeStamp = novaDataFim[1]+"/"+novaDataFim[0]+"/"+novaDataFim[2];
    maxTimeStamp = new Date(maxTimeStamp).getTime();

    //verificando se os campos estão preenchidos

    if(dataInicio =='' && dataFim == ''){
      alert("Você precisa selecionar a data de inicio e de fim para realizar a pesquisa");
      return;
    }

    //filtrando a lista

    lista = lista.filter(i=>(i.timestamp >= minTimeStamp && i.timestamp <= maxTimeStamp));
    setFiltro(lista);
    setScrollVisible(false);

  }

  return (
    <DismissKeyboard>
      <Container>
        {/*modal*/}

        <CustomModal visible={modalVisible} closeAction={CloseModel}>
          <SearchInput 
            placeholder="Pesquisar relatório por nome"
            returnKeyType="send" 
            onChangeText={(n)=>setName(n)}
            onSubmitEditing={()=>SearchName(name)}
            />

          <ContentBox>
            <DateInput placeholder="Data inicio" value={dataInit} onChangeText={(d)=>setDataInit(d)}/>
            <DateInput placeholder="Data fim" value={dataFim} onChangeText={(d)=>setDataFim(d)}/>
            <FilterButton underlayColor="#191970" onPress={()=>SearchData(dataInit,dataFim)}>
              <FindImage source={require('./images/find.png')}/>
            </FilterButton>
          </ContentBox>

          {scrollVisible &&
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
                    <Label>Taxa Cobrada: </Label>
                  </Box>
                  <Box>
                  <LabelValue>{item.taxa}%</LabelValue>
                  <LabelValue>{item.taxaCobrada}</LabelValue>
                  </Box>
                </OperationBox>
                );
                
              })}

            </OperationScroll>
          }
          {!scrollVisible &&
            <OperationScroll >
              {filtro.map((item,index)=>{
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
                    <Label>Taxa Cobrada: </Label>
                  </Box>
                  <Box>
                  <LabelValue>{item.taxa}%</LabelValue>
                  <LabelValue>{item.taxaCobrada}</LabelValue>
                  </Box>
                </OperationBox>
                );
                
              })}

            </OperationScroll>
          }
          <Box >
            <Text style={{alignSelf:"center"}}>Total das Operações:</Text>
            <Text style={{alignSelf:"center"}} >Total das Taxas:</Text>
          </Box>
          <ContentBox>
            <TaxaView>
              <Text >$ {totalOp}</Text>
            </TaxaView>
            <TaxaView>
            <Text >$ {totalTaxas}</Text>
          </TaxaView>
          </ContentBox>
          

          <Botao underlayColor="#191970" onPress={()=>setScrollVisible(true)}>
            <Text style={{color:"#fff", marginTop:0}}>Resetar busca</Text>
          </Botao>

        </CustomModal>

        <Header>Muito Dinheiro Cambio</Header>
        <Text>Nome Do Cliente:</Text>
        <ClientInput 
          autoCapitalize="words" 
          placeholder="Digite o nome do cliente" 
          value={name} 
          onChangeText={(n)=>setName(n)}
        />
        <TextBox>
          <Text>Data da operação:</Text>
          <Text>Taxa de cambio:</Text>
        </TextBox>
        <ContentBox>
          <BoxDate
            value={dataFormatada?dataFormatada:dFormated}
            onChangeText={(d)=>setDataFormatada(d)}
          />
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
          <CambioButton onPress={ChangeAction} underlayColor="#191970">
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
    </DismissKeyboard>
  );
}


export default App;

