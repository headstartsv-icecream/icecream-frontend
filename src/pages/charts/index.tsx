import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { fetchChartList } from '../../utils/commons'

import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import { HEADER_HEIGHT } from 'src/models/constants'
import MusicList from '../../components/MusicList'
import Image from 'next/image'

const PaddingTop = styled.div`
  padding-top: ${HEADER_HEIGHT};
`
const ParentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  padding-left: 2%;
  height: 60vh;
  background: linear-gradient(to bottom, #0bf, #ecd5ec);
`
const SelectFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 15px;
`
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  /* border: 1px solid black; */
`

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  height: 3rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background-color: #baa6f8;
  /* background: url('/arrow-down-sign-to-navigate.svg') no-repeat 95% 50%; */

  padding: 0.6em 1.4em 0.5em 2em;
  margin: 0;
  width: 200px;
  /* border: 1px solid #a650f7; */
  border-radius: 0.5em;
  /* box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04); */
`

const Option = styled.option`
  font-weight: normal;
`

const TitleFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  /* border: 1px solid black; */
`

const FirstTitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.5rem;

  /* border: 1px solid blue; */
`
const SecondTitle = styled.div`
  display: flex;
  color: #ffffff;
  font-weight: bold;
  font-size: 2.5rem;
  /* border: 1px solid red; */
  align-self: baseline;
`

const Icon = styled.div`
  display: flex;
  padding-top: 15px;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid yellow; */
`
function ChartsPage() {
  const [a, setA] = useState('KR')
  const [chartList, setChartList] = useState<any>()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setA(event.target.value)
  }

  const handleDelete = () => {
    console.info('You clicked the delete icon.')
  }

  useEffect(() => {
    ;(async () => {
      const result = await fetchChartList()
      setChartList(result)
    })()
  }, [])

  return (
    <PageTitle title="Icecream Music - Charts">
      <PageLayout>
        <PaddingTop />
        <ParentContainer>
          <SelectFlex>
            <Select value={a} onChange={handleChange}>
              {(chartList?.countries as any[])?.map((country) => (
                <Option key={country.id} value={country.id}>
                  {country.name}
                </Option>
              ))}
            </Select>
          </SelectFlex>
          <MainGrid>
            <Icon>
              <Image src="/play-circle-regular.svg" alt="play-button" width={80} height={80} />
            </Icon>
            <TitleFlex>
              <FirstTitle>{a}</FirstTitle>
              <SecondTitle>Top 200</SecondTitle>
              <FirstTitle>이번 주에 {a}에서 가장 많이 icezam된 트랙</FirstTitle>
            </TitleFlex>
          </MainGrid>
        </ParentContainer>
        <MusicList countryCode={a} />
      </PageLayout>
    </PageTitle>
  )
}

export default ChartsPage
