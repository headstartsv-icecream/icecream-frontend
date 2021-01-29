import { Story, Meta } from '@storybook/react'
import MusicNameOverlay, { Props } from './MusicNameOverlay'

export default {
  title: 'Example/MusicNameOverlay',
  component: MusicNameOverlay,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<Props> = (args) => <MusicNameOverlay {...args} />

export const Primary = Template.bind({})
Primary.args = {
  musicName: 'music name 1',
  backgroundColor: '#30aed4',
}

export const Secondary = Template.bind({})
Secondary.args = {
  musicName: 'music name 2',
  backgroundColor: '#4d2b04',
}
