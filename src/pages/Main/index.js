import React, { useState } from 'react';
import { Button, Input, Row, Modal } from 'antd';
import {Container, AnimationContainer, Background} from './styles'
import './styles.less'
import { useCallback } from 'react';

const Main = () => {
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [resultado, setResultado] = useState(false)
    const [fila, setFila] = useState([])
    const [nome, setNome] = useState('')
    const [valor, setValor] = useState()
    const [quantum, setQuantum] = useState(1)
    const [tabelaResultado, setTabelaResultado] = useState([]);
    const [add, setAdd] = useState(false)

    //valor = tempo do processador

    const circular = useCallback(() => {

        let dadosTemp = [];

        var index = 0;

        var dados = fila.map(item => item)

        var tempoTotal = 0;
		var tme = 0;
		var tmr = 0;
		var tempo_turnaround = [];
		var tep = [];
		var tpp = [];

        while(dados.length > 0){

            let processo = dados[index];
			
			tempoTotal += quantum;

            if(processo.tempo > quantum){
                dados[index] = {
                nome: processo.nome,
                tempo : processo.tempo - quantum,
                tempoExecucao: processo.tempoExecucao + quantum,
                }

            }else{
                dadosTemp.push({
                nome: processo.nome,
                tempo : 0,
                tempoExecucao: processo.tempoExecucao + processo.tempo,
                tempoTotal : tempoTotal - (processo.tempoExecucao + processo.tempo)
                })
				
				var somaFinal = processo.tempoExecucao + processo.tempo + (tempoTotal - (processo.tempoExecucao + processo.tempo)); 
				
				tme += tempoTotal - (processo.tempoExecucao + processo.tempo);
				tmr += somaFinal;
				
				tempo_turnaround.push(`${processo.nome} = ${somaFinal}`)
				
				tep.push(`${processo.nome} = ${tempoTotal - (processo.tempoExecucao + processo.tempo)}`)
				
				tpp.push(`${processo.nome} = ${processo.tempoExecucao + processo.tempo}`);
				
                dados.splice(index, 1);

            }

            index += 1;
			


            if(index === dados.length){
                index = 0;
            }else{
                if(index > dados.length){
                    index = 0;
                }
            }

        }
		
        console.log("Resultado")
        
        const obj = [
            `Tempo turnaround: ${JSON.stringify(tempo_turnaround)}`,
           `Tempo médio de retorno (TMR): ${tmr / dadosTemp.length}`,
            `Tempo de espera de cada processo (TEP): ${JSON.stringify(tep)}`,
           `Tempo médio de espera (TME): ${tme / dadosTemp.length}`,
           `Tempo de processamento de cada processo: ${JSON.stringify(tpp)}`,
            `Tempo de processamento total do processador: ${tempoTotal}`
        ]

        setTabelaResultado(obj);
        
    }, [fila, quantum])


    const inserir = useCallback(() => {
        if(parseInt(quantum) === 0 && parseInt(valor) === 0){
            console.log('nao seja viadao')
        }
        else{
            const objeto = {
                nome: nome,
                tempo: parseInt(valor),
                tempoExecucao: 0,
                tempoTotal: 0,

            }
            setQuantum(parseInt(quantum))

            setFila([...fila, objeto])
            
        }
    }, [fila, nome, quantum, valor])

    return (
        <>
        <Background>
        <Container>
                <AnimationContainer>
                    <form >

                        <Row style={{display: 'flex', justifyContent: 'center'}}>
                        </Row>
                        <Row style={{display: 'flex', justifyContent: 'center'}}>
                            <Button shape="round" onClick={() => setVisible(true)} className="button" type="primary" danger>Inserir</Button>
                        <Modal
                            title="Inserir"
                            visible={visible}
                            onOk={() => {
                            setValor()
                            setNome('')
                            setQuantum()
                            setAdd(true)
                            inserir()
                            }}
                            onCancel={() => setVisible(false)}
                            >                        
                            <Row>
                                <Input value={nome}  className="input" onChange={(e) => setNome(e.target.value)} style={{width: 300}} size="large" placeholder="Nome do processo"/>
                            </Row>
                            <Row>
                                <Input className="input" onChange={(e) => setValor(parseInt(e.target.value))} style={{width: 300}} size="large" placeholder="Tempo do processador" />
                            </Row>
                            <Row>
                                <Input className="input" onChange={(e) => setQuantum(parseInt(e.target.value))} style={{width: 300}} size="large" placeholder="Quantum" />
                            </Row>
                            {add ? <Row><span style={{color: 'green'}}>Valor adicionado com sucesso!</span></Row> : <div></div>}
                            
                        </Modal>
                        
                        </Row>
                        
                            <Row>
                                <Button shape="round" onClick={() => setVisible2(true)} className="button" type="primary" danger>Mostrar</Button>
                                    <Modal
                                    title="Mostrar"
                                    visible={visible2}
                                    onOk={() => {
                                    setVisible2(false)
                                    }}
                                    onCancel={() => setVisible2(false)}>
                                        {fila.map(item => {
                                            return(
                                                <>
                                                <div>
                                                    <span>Nome do processo: {item.nome}</span>
                                                </div>
                                                
                                                <span>Tempo de resposta: {item.tempo}</span>
                                                </>
                                            )
                                        })}
                                    </Modal> 
                            </Row>
                            <Row>
                                <Button shape="round" onClick={() => {
                                    setResultado(true)
                                    circular()

                                    }} className="button" type="primary" danger>Circular</Button>
                                    <Modal
                                        title="Resultado"
                                        visible={resultado}
                                        onOk={() => {
                                        setResultado(false)
                                        }}
                                        onCancel={() => setResultado(false)}
                                        >

                                            {
                                                tabelaResultado.map(item => <div key={item}>{item}</div>)
                                            }                        
                                        
                                    </Modal>
                            </Row>
                        
                            
                    </form>
                </AnimationContainer>
        </Container>
        </Background>
        </>
    )
}

export default Main