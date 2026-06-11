'use client';

import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { keycloakSignIn } from '@/app/actions/auth';
import { useSession } from 'next-auth/react';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSignIn = () => {
    startTransition(async () => {
      await keycloakSignIn('/');
    });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.card}>
          <Image
            src="/grss-logo.png"
            alt="GRSS VEDA"
            width={96}
            height={96}
            priority
            className={styles.logo}
          />
          <div>
            <h1 className={styles.title}>Welcome to GRSS VEDA Ingest</h1>
            <p className={styles.subtitle}>
              Sign in to manage datasets and collections
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            block
            onClick={handleSignIn}
            loading={isPending}
            disabled={isPending}
          >
            Sign in with GRSS VEDA SSO
          </Button>
        </div>
      </main>
      <footer className={styles.footer}>
        <Image
          src="/ieee-grss.jpg"
          alt="IEEE GRSS"
          width={120}
          height={32}
          className={styles.footerLogo}
        />
        <p className={styles.footerCopy}>
          © Copyright {new Date().getFullYear()} IEEE – All rights reserved. A
          public charity, IEEE is the world&rsquo;s largest technical
          professional organization dedicated to advancing technology for the
          benefit of humanity.
        </p>
      </footer>
    </div>
  );
}
