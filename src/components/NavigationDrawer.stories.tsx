import { Story, Meta } from '@storybook/react'
import NavigationDrawer, { Props } from './NavigationDrawer'

export default {
  title: 'Example/NavigationDrawer',
  component: NavigationDrawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta

const Template: Story<Props> = (args) => <NavigationDrawer {...args} />

export const Primary = Template.bind({})
Primary.args = {
  isOpen: true,
}

export const Secondary = Template.bind({})
Secondary.args = {
  isOpen: false,
}
