import Image from 'react-lazy-image'
export default props => (
  <Image
    {...props}
    defaultSource={require('@/assets/images/logo.png')}
    source={props.src}
  />
)
