import { FormEvent, useState } from 'react';
import styles from './Login.module.scss';
import FormField from '@/app/elements/FormField/FormField';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

const Login = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslations('Login');
    const message = useTranslations('Messages');
    const router = useRouter();
    const { push } = useRouter();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const res = await signIn('credentials', { ...data, callbackUrl: '/', redirect: false });
        if (!res?.ok) {
            toast.error(message(res?.error));
        } else {
            router.push('/');
        }
        setIsLoading(false);
    };

    return (
        <article className={styles.container}>
            <form onSubmit={handleLogin}>
                <h1>{t('title')}</h1>

                <div className={styles.input_group}>
                    <FormField
                        className={styles.input}
                        name='email'
                        placeholder={t('email')}
                        required={true}
                    />
                    <div className={styles.password}>
                        <FormField
                            className={styles.input}
                            name='password'
                            placeholder={t('password')}
                            required={true}
                            type={passwordType}
                        />
                        {passwordType === 'password' ? (
                            <IoEyeOffOutline
                                className={styles.eye}
                                onClick={() => setPasswordType('string')}
                            />
                        ) : (
                            <IoEyeOutline
                                className={styles.eye}
                                onClick={() => setPasswordType('password')}
                            />
                        )}
                    </div>

                    <Link
                        href={'/'}
                        className={styles.forgot_pass}
                    >
                        {t('forgot_pass')}
                    </Link>
                </div>
                <div className={styles.footer}>
                    <button
                        type='button'
                        onClick={() => push('/auth/register')}
                    >
                        {t('register')}
                    </button>
                    <button type='submit'>
                        <ImSpinner2
                            style={{ display: isLoading ? 'block' : 'none' }}
                            className={styles.loading}
                        />
                        {t('login')}
                    </button>
                </div>
            </form>
        </article>
    );
};

export default Login;
