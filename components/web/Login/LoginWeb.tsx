import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../constants/Styles';
import { AppText } from '../../../constants/Constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginSchemaType } from '../../../models/login.model';
import { useEffect, useState } from 'react';
import AuthSession from '../../../services/AuthSession';
import ApiService from '../../../services/ApiService';

const roleConfig: Record<string, { title: string; subtitle: string; accent: string; heroTitle: string; heroText: string; icon: string }> = {
  responsable: {
    title: 'Connexion Direction',
    subtitle: 'Accedez aux outils de gestion de votre creche.',
    accent: '#C85A00',
    heroTitle: 'Gerez votre creche en toute clarte',
    heroText: 'Locaux, ratios, inscriptions et rapports officiels depuis un portail moderne.',
    icon: 'D',
  },
  educatrice: {
    title: 'Connexion Educatrice',
    subtitle: 'Saisissez les fiches journalieres et suivez les activites.',
    accent: '#7C3AED',
    heroTitle: 'Votre espace de travail quotidien',
    heroText: 'Saisie journaliere, programme de la semaine et carnet de developpement.',
    icon: 'E',
  },
  parent: {
    title: 'Connexion Parent',
    subtitle: "Consultez les fiches de votre enfant et les nouveautes de la creche.",
    accent: '#2A9D8F',
    heroTitle: 'Suivez chaque moment de votre enfant',
    heroText: 'Absences, fiches journalieres et galerie photos en toute simplicite.',
    icon: 'P',
  },
};

export default function LoginWeb({ route, navigation }: { route: any; navigation: any }) {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const role = String(route?.params?.role ?? 'parent').toLowerCase();
  const config = roleConfig[role] ?? roleConfig.parent;
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) });

  const existingSession = AuthSession.loadAuthSession();
  useEffect(() => {
    if (existingSession?.role === role) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [existingSession, navigation, role]);

  const onSubmit = async (data: LoginSchemaType) => {
    await ApiService.Login(data, role)
      .then((res) => {
        if (res.success === true) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      })
      .catch((loginError) => {
        const errorMessage = String(loginError?.message ?? '');
        const normalizedMessage = errorMessage.toLowerCase();

        console.log('Login error loginpage:', errorMessage);

        if (normalizedMessage.includes('unauthorized')) {
          setError(AppText.invalid_credentials);
          return;
        }

        if (
          normalizedMessage.includes('failed to fetch') ||
          normalizedMessage.includes('networkerror') ||
          normalizedMessage.includes('network error') ||
          normalizedMessage.includes('cors') ||
          normalizedMessage.includes('err_failed')
        ) {
          setError("Connexion bloquee par le serveur (CORS/reseau). Contactez l'administrateur API.");
          return;
        }

        setError(errorMessage || 'Connexion impossible. Reessayez dans un instant.');
      });
  };

  return (
    <View style={styles.loginLayout}>
      <View style={[styles.loginHero, { backgroundColor: config.accent }]}>
        <View>
          <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>Bout de Choux</Text></View>
          <Text style={styles.heroTitleWhite}>{config.heroTitle}</Text>
          <Text style={styles.heroTextWhite}>{config.heroText}</Text>
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <View style={{ width: 72, height: 72, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 30, fontWeight: '800' }}>{config.icon}</Text>
          </View>
        </View>
      </View>
      <View style={styles.loginPanel}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backLink, { color: config.accent }]}>â† Changer d'espace</Text>
        </TouchableOpacity>
        <Text style={styles.formTitle}>{config.title}</Text>
        <Text style={styles.formSubtitle}>{config.subtitle}</Text>

        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Adresse e-mail</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                onFocus={() => setError('')}
                value={value}
                placeholder={AppText.email_input}
                autoCapitalize='none'
              />
            )}
            name='email'
            rules={{ required: true }}
            defaultValue='user12@example.com'
          />
          {errors.email && <Text style={styles.text_error}>{errors.email.message}</Text>}
        </View>

        <View style={styles.formField}>
          <Text style={styles.fieldLabel}>Mot de passe</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  onFocus={() => setError('')}
                  secureTextEntry={!showPassword}
                  placeholder={AppText.password_input}
                />
                <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                  <Text style={{ color: config.accent, fontWeight: '700' }}>{showPassword ? 'Masquer' : 'Voir'}</Text>
                </TouchableOpacity>
              </View>
            )}
            name='password'
            rules={{ required: true }}
            defaultValue='Test@1234'
          />
          {errors.password && <Text style={styles.text_error}>{errors.password.message}</Text>}
        </View>

        <View style={styles.checkboxRow}>
          <View style={{ width: 18, height: 18, borderWidth: 1, borderColor: '#d0d5dd', borderRadius: 4, backgroundColor: '#fff' }} />
          <Text style={styles.checkboxText}>Rester connecte sur cet appareil</Text>
        </View>

        {error !== '' && <Text style={styles.text_error}>{error}</Text>}

        <TouchableOpacity style={[styles.primaryButton, { backgroundColor: config.accent }]} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.primaryButtonText}>{AppText.connexion_button}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Register', { role })}>
          <Text style={styles.secondaryButtonText}>{AppText.register_redirection}</Text>
        </TouchableOpacity>

        <Text style={styles.helperText}>Connexion securisee Â· Donnees chiffrees Â· Acces reserve au portail selectionne.</Text>
      </View>
    </View>
  );
}

