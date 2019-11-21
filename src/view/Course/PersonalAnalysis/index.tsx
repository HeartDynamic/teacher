/*
    个人分析
 */
import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import Radar from '../../../components/Echarts/Radar'
import Line from '../../../components/Echarts/Line'
import Back from './Back'
import Pie from './Pie'
import LoreNumber from './LoreNumber'
import LoreList from './LoreList'

interface IProps {
    studentId: string
}

const Container = styled.div`
    box-sizing: border-box;
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
const Container1 = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-right: 5px;
`
const Wrap = styled.div`
    box-sizing: border-box;
    width: 1260px;
    margin: 0 auto;
`
const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StudentInfo = styled.div`
    display: flex;
`
const Student = styled.div`
    min-width: 180px;
`
const StudentName = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`
const StudentType = styled.span`
    display: inline-block;
    width: 60px;
    border-right: 1px solid rgba(20, 78, 94, 1);
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(20, 78, 94, 1);
    margin-right: 20px;
`

const RadarWrap = styled.div`
    box-sizing: border-box;
    width: 510px;
    height: 300px;
    box-shadow: 0px 2px 4px 0px rgba(100, 115, 219, 0.09);
    border-radius: 4px;
    padding: 20px;
`

const KnowledgeWrap = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 240px 1fr;
    grid-column-gap: 20px;
    margin: 20px 0;
`
const KnowledgeWrap1 = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    margin: 20px 0;
`
const Knowledge = styled.div`
    box-sizing: border-box;
    height: 300px;
    padding: 20px;
    box-shadow: 0px 2px 4px 0px rgba(100, 115, 219, 0.09);
    border-radius: 4px;
`
const Knowledge1 = styled.div`
    box-sizing: border-box;
    height: 300px;
`
const Knowledge2 = styled.div`
    box-sizing: border-box;
    height: 150px;
    padding: 20px;
    box-shadow: 0px 2px 4px 0px rgba(100, 115, 219, 0.09);
    border-radius: 4px;
`
const Package = styled.div`
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 20px;
`
const LineWrap = styled.div`
    width: 100%;
    height: 250px;
`
const LoreName = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 20px;
`

const PersonalAnalysis: FC<RouteComponentProps<IProps>> = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)

    useEffect(() => {
        courseIndexStore.getTestAcademicAnalysisStudent(props.location!.state.studentId)
        // eslint-disable-next-line
    }, [props.location!.state.studentId])

    return useObserver(() => {
        return (
            <Container1>
                <Container>
                    <Wrap>
                        <Header>
                            <Back data={{ url: props.uri, returnLine: props.location!.state.returnLine }}></Back>
                            <StudentInfo>
                                <Student>
                                    <StudentType>学生</StudentType>
                                    <StudentName>
                                        {courseIndexStore.testAcademicAnalysisStudent.studentName}
                                    </StudentName>
                                </Student>
                                <Student></Student>
                            </StudentInfo>
                        </Header>
                        <KnowledgeWrap>
                            <Knowledge>
                                {courseIndexStore.gettingTestAcademicAnalysisStudent ? (
                                    <Pie
                                        text='总体知识点正确率'
                                        data={{
                                            avgAccuracy: courseIndexStore.testAcademicAnalysisStudent.totalAccuracy,
                                        }}
                                    ></Pie>
                                ) : null}
                            </Knowledge>
                            <Knowledge1>
                                <Knowledge2>
                                    <LoreNumber
                                        data={{
                                            text: '班级正确率排名',
                                            loreCount: courseIndexStore.testAcademicAnalysisStudent.classRanking,
                                            typeText: '名',
                                            setColor: '#FFC821',
                                        }}
                                    ></LoreNumber>
                                </Knowledge2>
                                <Knowledge2>
                                    <LoreNumber
                                        data={{
                                            text: '年级正确率排名',
                                            loreCount: courseIndexStore.testAcademicAnalysisStudent.gradeRanking,
                                            typeText: '名',
                                            setColor: '#42C3D0',
                                        }}
                                    ></LoreNumber>
                                </Knowledge2>
                            </Knowledge1>
                            <Knowledge>
                                <LoreNumber
                                    data={{
                                        text: '知识点数量',
                                        loreCount: courseIndexStore.testAcademicAnalysisStudent.loreCount,
                                        typeText: '个',
                                        setColor: '#6D8DD2',
                                    }}
                                ></LoreNumber>
                                <LoreNumber
                                    data={{
                                        text: '薄弱知识点',
                                        loreCount: courseIndexStore.testAcademicAnalysisStudent.weaknessLoreCount,
                                        typeText: '个',
                                        setColor: '#996DD2',
                                    }}
                                ></LoreNumber>
                            </Knowledge>
                            <RadarWrap>
                                {courseIndexStore.gettingTestAcademicAnalysisStudent ? (
                                    <Radar
                                        data={{
                                            indicator: courseIndexStore.testAcademicAnalysisStudent.sectionLoreAccuracy.map(
                                                item => {
                                                    return { max: item.max, name: item.name }
                                                }
                                            ),
                                            series: courseIndexStore.testAcademicAnalysisStudent.sectionLoreAccuracy.map(
                                                item => {
                                                    return item.accuracy
                                                }
                                            ),
                                            labels: courseIndexStore.testAcademicAnalysisStudent.sectionLoreAccuracy.map(
                                                item => {
                                                    return item.name
                                                }
                                            ),
                                            textStyle: {
                                                titleText: '章节知识点正确率雷达图',
                                            },
                                        }}
                                    ></Radar>
                                ) : null}
                            </RadarWrap>
                        </KnowledgeWrap>
                        <Package>
                            <LoreName>总体知识点正确率变化</LoreName>
                            <LineWrap>
                                {courseIndexStore.gettingTestAcademicAnalysisStudent ? (
                                    <Line data={courseIndexStore.testAcademicAnalysisStudent.loreAccuracyChange}></Line>
                                ) : null}
                            </LineWrap>
                        </Package>
                        <KnowledgeWrap1>
                            <Knowledge>
                                {courseIndexStore.testAcademicAnalysisStudent.bestLores.map((item, index) => (
                                    <LoreList
                                        key={index}
                                        data={{
                                            ...item,
                                            index,
                                            colorArr: ['#23710C', '#219600', '#29C000', '#6FD554', '#9EE379'],
                                        }}
                                    ></LoreList>
                                ))}
                            </Knowledge>
                            <Knowledge>
                                {courseIndexStore.testAcademicAnalysisStudent.worstLores.map((item, index) => (
                                    <LoreList
                                        key={index}
                                        data={{
                                            ...item,
                                            index,
                                            colorArr: ['#780000', '#AF0F0F', '#E33939', '#F66868', '#F18787'],
                                        }}
                                    ></LoreList>
                                ))}
                            </Knowledge>
                        </KnowledgeWrap1>
                    </Wrap>
                </Container>
            </Container1>
        )
    })
}

export default PersonalAnalysis
