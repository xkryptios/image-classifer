import { TouchableOpacity, Text } from 'react-native'

export default ({ onPress, title }) => {

    return <TouchableOpacity
        onPress={onPress}
        style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: '#14274e',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40
        }}
    >
        <Text
            style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
            }}
        >
            {title}
        </Text>
    </TouchableOpacity>
}