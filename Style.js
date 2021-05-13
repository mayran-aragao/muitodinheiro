import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex:1;
  align-items:center;
  padding:30px;
  background-color:#FFF;
`;
export const Header = styled.Text`
  font-size:24px;
  margin-top:10px;
  font-weight:bold;
`;
export const TextBox = styled.View`
  width:100%;
  flex-direction:row;
  justify-content:space-between;
`;
export const Text = styled.Text`
  margin-top:10px;
  align-self:center;
  font-weight:bold;
`;
export const ClientInput = styled.TextInput`
  width:100%;
  height:50px;
  border: 1px solid #000;
  border-radius:10px;
  padding-left:20px;
  margin-top:10px;
`;
export const ContentBox = styled.View`
  flex-direction:row;
  flex-wrap:wrap;
  width:100%;
  height:50px;
  border-radius:10px;
  justify-content:space-between;
  margin-bottom:5px;
`;
export const BoxDate = styled.View`
  width:35%;
  padding-left:10px;
  justify-content:center;
  border-radius:10px;
  margin-top:10px;
  border: 1px solid #000;
`;
export const TaxBox = styled.TextInput`
  width:45%;
  height:50px;
  border: 1px solid #000;
  align-items:center;
  justify-content:center;
  border-radius:10px;
  margin-top:10px;
  padding:10px;
`;
export const DateText = styled.Text``;
export const BoxChange = styled.View`
  flex-direction:row;
  flex-wrap:wrap;
  width:100%;
  height:200px;
  border: 1px solid #000;
  border-radius:10px;
  margin-top:10px;
  justify-content:center;
`;
export const CoinInput = styled.View`
  width:30%;
  height:50px;
  border: 1px solid #000;
  border-radius:10px;
  margin-top:10px;
  justify-content:center;
  align-items:center;
  padding-left:10px;
  padding-bottom:5px;
`;
export const ValorInput = styled.TextInput`
  width:60%;
  height:50px;
  border: 1px solid #000;
  border-radius:10px;
  margin-top:10px;
  padding:10px;
  margin-left:5px; 
`;
export const CambioButton = styled.TouchableHighlight`
  width:80%;
  height:40px;
  background-color:#4169E1FF;
  border-radius:10px;
  margin-top:10px;
  align-items:center;
`;
export const Seletor = styled.Picker`
  width:25%;
  height:50px;
  padding-right:110px;
  justify-content:center;
  align-items:center;
`;
export const CotaInput = styled.TextInput`
  width:23%;
  padding-left:10px;
  justify-content:center;
  border-radius:10px;
  margin-top:10px;
  border: 1px solid #000;
`;
export const TaxaView = styled.View`
    width:30%;
    height:50px;
    border: 1px solid #000;
    align-self:flex-start;
    border-radius:10px;
    margin-top:10px;
    padding-left:10px;
    padding-top:4px;
`;
export const Botao = styled.TouchableHighlight`
    width:100%;
    height:50px;
    background-color:#4169E1FF;
    border-radius:10px;
    margin-top:10px;
    justify-content:center;
`;
export const SearchInput = styled.TextInput`
  width:100%;
  height:50px;
  border: 1px solid #000;
  border-radius:10px;
  padding-left:20px;
  margin-top:10px;
  background-color:#eee;
`;
export const OperationScroll = styled.ScrollView`
    width:100%;
    height:65%;
    margin-top:10px;
`;
export const OperationBox = styled.View`
    width:100%;
    height:200px;
    background-color:#eee;
    border: 1px solid #000;
    margin-top:5px;
    border-radius:10px;
`;
export const Box = styled.View`
    width:100%;
    height:25px;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    padding-bottom:10px;
    padding-left:5px;
    padding-right:5px;
`;
export const Label = styled.Text`
    font-weight:bold;

`;
export const LabelValue = styled.Text`
    padding-bottom:10px;
    
`;