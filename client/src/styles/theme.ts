import { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#373635',
    colorBgBase: '#ffffff',
    colorBgContainer: '#ffffff',
    colorText: '#463b2b',
    colorTextSecondary: '#9b8878',
    colorBorder: '#b5b5b5',
    borderRadius: 9,
    borderRadiusLG: 5,
    borderRadiusSM: 5,
    fontFamily: "'Justus Roman', Georgia, serif",
    fontSize: 15,
    boxShadow: '0 2px 2px rgba(44, 36, 23, 0.08)',
    boxShadowSecondary: '0 2px 2px rgba(44, 36, 23, 0.06)',
  },
  components: {
    Button: {
      borderRadius: 5,
      controlHeight: 44,
    },
    Card: {
      borderRadiusLG: 9,
    },
    Form: {
      labelColor: '#9b8878',
      labelFontSize: 12,
    },
    Tag: {
      borderRadiusSM: 5,
    },
  },
}

export default theme
