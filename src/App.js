
import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row } from './styles';
import { useState } from 'react';


const App = () => {
  const [currentScreen,setCurrentScreen] = useState('0')
  const [newCount,setNewCount] = useState(true)
  
  const handleOnClear = () => {
    setCurrentScreen('0')  
    setNewCount(true)
  }

  const handleOnEqual = () => {
    
    
    // this is the string that we will be processing eg. -10+26+33-56*34/23
    let inputString = currentScreen

    if (newCount) {
      alert('Inclua uma nova expressão!')
      setCurrentScreen(0);
      return
    }
    
    const operadores = ['+','-','*','÷']
    const lastCaractere = inputString.charAt(inputString.length - 1)

    if (operadores.includes(lastCaractere)) {
      alert('A expressão deve começar e terminar com números!')
      setCurrentScreen('0')
      return
    }
  // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
    let numbers = inputString.split(/\+|-|\*|÷/g)

  // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
  // first we replace all the numbers and dot with empty string and then split
    let operators = inputString.replace(/[0-9]|\./g, "").split("");

  // now we are looping through the array and doing one operation at a time.
  // first divide, then multiply, then subtraction and then addition
  // as we move we are alterning the original numbers and operators array
  // the final element remaining in the array will be the output

  let divide = operators.indexOf("÷");
  while (divide !== -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("*");
  while (multiply !== -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("*");
  }

  let subtract = operators.indexOf("-");
  while (subtract !== -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add !== -1) {
    // using parseFloat is necessary, otherwise it will result in string concatenation :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }
  setCurrentScreen(numbers[0]);
  setNewCount(true)
  }

  const handleReadKey = (key) => {
    const operadores = ['+','-','*','÷']
    if (operadores.includes(key)) {
      if (newCount) {
        setCurrentScreen('0')
        return
      }
    }    
    if (newCount) {
      setCurrentScreen('0')
      setNewCount(false)
    }

    
    
    

    let lastCaractere
    let myString = currentScreen;
    
    if (myString.length > 0) {
      lastCaractere = myString.charAt(myString.length - 1)      
    }
    
    
    if (operadores.includes(lastCaractere) && operadores.includes(String(key))) {
      myString = myString.slice(0, -1)
      setCurrentScreen(myString)
    }

    setCurrentScreen(prev => `${prev === '0' ? '' : prev}${key}`)        
    

    

  }

  return (
    <Container>
      <Content>
        <Input value={currentScreen}/>
      <Row>
          <Button label="7" onClick={() => handleReadKey('7')}/>
          <Button label="8" onClick={() => handleReadKey('8')}/>
          <Button label="9" onClick={() => handleReadKey('9')}/>
          <Button label="C" onClick={handleOnClear}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleReadKey('4')}/>
          <Button label="5" onClick={() => handleReadKey('5')}/>
          <Button label="6" onClick={() => handleReadKey('6')}/>
          <Button label="÷" onClick={() => handleReadKey('÷')}/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleReadKey('1')}/>
          <Button label="2" onClick={() => handleReadKey('2')}/>
          <Button label="3" onClick={() => handleReadKey('3')}/>
          <Button label="*" onClick={() => handleReadKey('*')}/>
        </Row>
        <Row>
          <Button label="0" onClick={() => handleReadKey('0')}/>
          <Button label="=" onClick={handleOnEqual}/>
          <Button label="+" onClick={() => handleReadKey('+')}/>
          <Button label="-" onClick={() => handleReadKey('-')}/>
        </Row>
      </Content>
    </Container>
  );
}

export default App;
