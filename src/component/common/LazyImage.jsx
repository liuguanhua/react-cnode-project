import Image from 'react-lazy-image'
export default props => (
  <Image
    {...props}
    defaultSource={require('@images/logo.png')}
    source={props.src}
  />
)
