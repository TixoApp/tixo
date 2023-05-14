import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { HStack, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const Navbar = () => {
  const { address } = useAccount();
  const { route } = useRouter();

  if (route === "/" && !address) return;

  return (
    <HStack className={styles.navbar}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo"
          cursor="pointer"
          className={styles.logo}
        ></Image>
      </Link>
      <HStack>
        <ConnectButton />
      </HStack>
    </HStack>
  );
};

export default Navbar;
