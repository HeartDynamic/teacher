import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import ReactToPrint from 'react-to-print'
import styled from '@emotion/styled'

import { IStore } from '../../store'
import VolumeTopic from './VolumeTopic'
import Button from '../../components/Button'

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const Ul = styled.ul`
    width: 1260px;
    margin: 20px auto;
    border: 1px solid #e4e7ed;
    background-color: rgba(245, 247, 250, 1);
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: space-between;
`
const Li = styled.li`
    display: flex;
`
const Li1 = styled.li``
const Title = styled.span<{ setStyle: boolean }>`
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: ${props => (props.setStyle ? '#409eff' : '#303133')};
    cursor: pointer;
    border-right: 1px solid #e4e7ed;
    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    :hover {
        color: #409eff;
    }
`
const Table = styled.table`
    width: 1260px;
    margin: 0 auto;
`
const Thead = styled.thead`
    margin-bottom: 20px;
`
const Tbody = styled.tbody``
const Tr = styled.tr``
const Th = styled.th`
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
`
const Td = styled.td`
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
`
const SpanWrap = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`
const Span = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
`
const Span1 = styled(Span)`
    margin-right: 160px;
`
const Span2 = styled(Span)``

interface IProps {
    id: string
}

const Volume: FC<RouteComponentProps<IProps>> = props => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [current, setCurrent] = useState(1)
    const componentRef = useRef<HTMLTableElement>(null)

    useEffect(() => {
        volumeStore.volumeDetailList.id = Number(props.id)
        volumeStore.getVolumeProblemAll()
        // eslint-disable-next-line
    }, [props.id])

    // const handleClick = () => {
    //     window.print()
    // }
    const handleClickType = (type: number) => {
        setCurrent(type)
    }

    return useObserver(() => {
        return (
            <Container>
                <Ul>
                    <Li>
                        <Title key={1} setStyle={current === 1} onClick={() => handleClickType(1)}>
                            题目
                        </Title>
                        <Title key={2} setStyle={current === 2} onClick={() => handleClickType(2)}>
                            答案
                        </Title>
                    </Li>
                    <ReactToPrint
                        trigger={() => (
                            <Li1>
                                <Button>打印</Button>
                            </Li1>
                        )}
                        content={() => componentRef.current!}
                    />
                </Ul>
                <Table ref={componentRef}>
                    <Thead>
                        <Tr>
                            <Th>{volumeStore.volumeVolumeProblemAll.name}</Th>
                        </Tr>
                        <Tr>
                            <Td>
                                <SpanWrap>
                                    <Span1>班级</Span1>
                                    <Span2>姓名</Span2>
                                </SpanWrap>
                            </Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <VolumeTopic
                            data={{
                                arr: volumeStore.volumeVolumeProblemAll.choiceProblems,
                                typeName: '单选题',
                                current,
                            }}
                        ></VolumeTopic>
                        <VolumeTopic
                            data={{
                                arr: volumeStore.volumeVolumeProblemAll.checkboxProblems,
                                typeName: '多选题',
                                current,
                            }}
                        ></VolumeTopic>
                        <VolumeTopic
                            data={{
                                arr: volumeStore.volumeVolumeProblemAll.judgeProblems,
                                typeName: '判断题',
                                current,
                            }}
                        ></VolumeTopic>
                        <VolumeTopic
                            data={{
                                arr: volumeStore.volumeVolumeProblemAll.fillingProblems,
                                typeName: '填空题',
                                current,
                            }}
                        ></VolumeTopic>
                        <VolumeTopic
                            data={{
                                arr: volumeStore.volumeVolumeProblemAll.shortAnswerProblems,
                                typeName: '简答题',
                                current,
                            }}
                        ></VolumeTopic>
                    </Tbody>
                </Table>
            </Container>
        )
    })
}

export default Volume
