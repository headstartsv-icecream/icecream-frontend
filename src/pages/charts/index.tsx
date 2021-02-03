import styled from 'styled-components'
import { useState, useEffect, ChangeEvent } from 'react'
import { fetchChartList } from '../../utils/commons'
import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/layouts/PageTitle'
import { HEADER_HEIGHT } from 'src/models/constants'
import MusicList from '../../components/MusicList'
import Image from 'next/image'
import TopProgressBar from 'src/components/TopProgressBar'

const ParentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 3fr 1fr;
  padding: ${HEADER_HEIGHT} 0 0 2%;
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

  padding: 0.6em 1.4em 0.5em 2em;
  margin: 0;
  width: 200px;
  border-radius: 0.5em;
`

const Option = styled.option`
  font-weight: normal;
`

const TitleFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const FirstTitle = styled.div`
  display: flex;
  flex-direction: row;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.5rem;
`
const SecondTitle = styled.div`
  display: flex;
  color: #ffffff;
  font-weight: bold;
  font-size: 2.5rem;
  align-self: baseline;
`

const Icon = styled.div`
  display: flex;
  padding-top: 15px;
  flex-direction: column;
  justify-content: center;
`
function ChartsPage() {
  const [countryCode, setCountryCode] = useState('KR')
  const [chartList, setChartList] = useState<any>()

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setCountryCode(e.target.value)
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
        <TopProgressBar />
        <ParentContainer>
          <SelectFlex>
            <Select value={countryCode} onChange={handleChange}>
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
              <FirstTitle>{countryCode}</FirstTitle>
              <SecondTitle>Top 200</SecondTitle>
              <FirstTitle>이번 주에 {countryCode}에서 가장 많이 icezam된 트랙</FirstTitle>
            </TitleFlex>
          </MainGrid>
        </ParentContainer>
        <MusicList countryCode={countryCode} />
      </PageLayout>
    </PageTitle>
  )
}

export default ChartsPage
