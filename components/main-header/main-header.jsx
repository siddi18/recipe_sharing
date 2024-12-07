'use client';
import logoImg from '../../assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import classes from './main-header.module.css';
import MainHeaderBackground from './main-header-background';
import NavLinks from './nav-link';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '../Spinner';

export default function MainHeader() {
  const { data: session, status } = useSession();
  const [isSharing, setIsSharing] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsSharing(true);
          router.push('/login'); // Wait for navigation
          setIsSharing(false);
  };

  // Get the first letter of the user's email if logged in
  const avatarLetter = session?.user?.email?.charAt(0).toUpperCase();

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href='/' className={classes.logo}>
          <Image src={logoImg} priority alt="Logo" />
          <div>
          <h1>NEXT LEVEL FOOD</h1>
          </div>
          
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <div>
              <NavLinks href='/meals'>Browse Meals</NavLinks>
              </div>
              
            </li>
            <li>
              <div>
              <NavLinks href='/community'>Community</NavLinks>

              </div>
            </li>

            <li>
              {status === "authenticated" ? (
                <div className={classes.profileContainer}>
                  <div className={classes.avatar}>{avatarLetter}</div>
                  <div className={classes.dropdownMenu}>
                    <div>
                      <Link href='/recipes' className={classes.div}>
                        Your Recipes
                      </Link>
                    </div>
                    <div>
                      <a onClick={() => signOut()}>Sign Out</a>
                    </div>
                  </div>
                </div>
              ) : 
                (<button className={classes.btn} onClick={handleLogin}>
                  {isSharing ? (
              <Spinner />
            ) : (
              "Sign in"
            )}
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
