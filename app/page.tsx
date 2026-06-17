import '@ant-design/v5-patch-for-react-19';
import AppLayout from '@/components/layout/Layout';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <AppLayout variant="plain">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 24,
        }}
      >
        <Image src="/grss-logo.png" alt="GRSS VEDA" width={72} height={72} />
        <h1
          style={{
            marginTop: 16,
            fontSize: '1.5rem',
            fontWeight: 500,
            color: 'var(--veda-foreground)',
          }}
        >
          Welcome to GRSS VEDA Ingest
        </h1>
        <p
          style={{
            marginTop: 10,
            maxWidth: 480,
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'var(--veda-muted-fg)',
          }}
        >
          Publish and manage Earth-observation datasets and STAC collections
          for the GRSS VEDA ecosystem. Choose a task from the menu to get
          started.
        </p>
      </section>
    </AppLayout>
  );
}

export default Home;
