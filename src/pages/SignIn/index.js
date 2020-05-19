import React, { useState } from 'react';
import { Button, Input, Row, Modal } from 'antd';
import {Container, AnimationContainer, Background} from './styles'
import './styles.less'
import { useCallback } from 'react';

const SignIn = () => {
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [fila, setFila] = useState([])
    const [nome, setNome] = useState('')
    const [valor, setValor] = useState()
    const [quantum, setQuantum] = useState(1)
    const [tempoEspera, setTempoEspera] = useState([])
    const [tempoResposta, setTempoResposta] = useState([]) 
    const [tempoMedioEspera, setTempoMEdioEspera] = useState()
    const [tempoMedioResposta, setTempoMedioResposta] = useState()
    const [filaTemporaria, setFilaTemporaria] = useState([])

    //valor = tempo do processador

    const circular = useCallback(() => {
        let index = 0
        let final = 0
        while(fila.length > 0){
            if(fila.length === index + 1){
                index = 0
            }else{
                let processo = fila[index]
            if(processo.valor <= quantum ){

                setFilaTemporaria([...filaTemporaria, {
                   nome: processo.nome,
                    valor: processo.valor,
                    tempoResposta: final - processo.execucao
               }])
               fila.splice(index, 1)
            }
            else{
                let processo = fila[index]
                let temp = processo.valor - quantum;
                final += quantum
                let array = fila
                array[index] = {
                    nome: processo.nome,
                    valor: temp,
                    execucao: processo.execucao + quantum
                }
                index += 1
                
            }
            }
        }
        
    }, [fila, filaTemporaria, quantum])


    const inserir = useCallback(() => {
        if(parseInt(quantum) === 0 && parseInt(valor) === 0){
            console.log('nao seja viadao')
        }
        else{
            const objeto = {
                nome: nome,
                valor: parseInt(valor),
                execucao: 0
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
                            setVisible(false)
                            inserir()
                            }}
                            onCancel={() => setVisible(false)}
                            >                        
                            <Row>
                                <Input  className="input" onChange={(e) => setNome(e.target.value)} style={{width: 300}} size="large" placeholder="Nome do processo"/>
                            </Row>
                            <Row>
                                <Input  className="input" onChange={(e) => setValor(e.target.value)} style={{width: 300}} size="large" placeholder="Tempo do processador" />
                            </Row>
                            <Row>
                                <Input value={quantum} className="input" onChange={(e) => setQuantum(e.target.value)} style={{width: 300}} size="large" placeholder="Quantum" />
                            </Row>
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
                                                
                                                <span>Tempo de resposta: {item.valor}</span>
                                                </>
                                            )
                                        })}
                                    </Modal> 
                            </Row>
                            <Row>
                                <Button shape="round" onClick={() => {
                                    circular()
                                    console.log(filaTemporaria)}} className="button" type="primary" danger>Circular</Button>
                            </Row>
                        
                            
                    </form>
                </AnimationContainer>
        </Container>
        </Background>
        </>
    )
}

export default SignIn