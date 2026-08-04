import { Text, TextInput, View } from 'react-native';
import { styles } from '../../../constants/Styles';
import ButtonCustom from '../../ButtonCustom/ButtonCustom';
import { AppText } from '../../../constants/Constants';
import { Controller, useForm } from 'react-hook-form';
import ApiService from '../../../services/ApiService';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginSchemaType } from '../../../models/login.model';
import { useState } from 'react';

export default function LoginMobile({ route, navigation }: { route: any; navigation: any }) {
  const [error, setError] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: LoginSchemaType) => {
    await ApiService.Login(data, route.params.role).then((res) => {
      if (res.success === true) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { role: route.params.role } }],
        });
      }
    }).catch((loginError) => {
      console.log('Login error loginpage:', loginError.message);
      setError(AppText.invalid_credentials);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{AppText.login_page_title}</Text>

      <View style={styles.form_container}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.form_text_input}
              onBlur={onBlur}
              onChangeText={onChange}
              onFocus={() => setError('')}
              value={value}
              placeholder={AppText.email_input}
            />
          )}
          name='email'
          rules={{ required: true }}
          defaultValue='user12@example.com'
        />
        {errors.email && <Text style={styles.text_error}>{errors.email.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.form_text_input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              onFocus={() => setError('')}
              secureTextEntry
              placeholder={AppText.password_input}
            />
          )}
          name='password'
          rules={{ required: true }}
          defaultValue='Test@1234'
        />
        {errors.password && <Text style={styles.text_error}>{errors.password.message}</Text>}
        {error !== '' && <Text style={styles.text_error}>{error}</Text>}

        <ButtonCustom title={AppText.connexion_button} style={[styles.button_principal, styles.aic]} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

