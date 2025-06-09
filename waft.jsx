import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const backgroundParticlesCount = 30;

// Animação das partículas
const moveParticle = keyframes`
  0% { transform: translate(0, 0) }
  50% { transform: translate(20px, -30px) }
  100% { transform: translate(0, 0) }
`;

// Styled Components

const Container = styled.div`
  background-color: #120000;
  min-height: 100vh;
  color: #ff4444;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
`;

const Background = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Particle = styled.div`
  position: absolute;
  background-color: #ff1111cc;
  border-radius: 50%;
  opacity: 0.3;
  animation-name: ${moveParticle};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  box-shadow: 0 0 10px #ff1111cc;
`;

const Header = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  background-color: #330000;
  border-bottom: 1px solid #ff1111;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  color: #ff4444;
  font-weight: 700;
  font-size: 1.7rem;
  transition: all 0.3s ease;

  &.shrink {
    padding: 10px 40px;
    font-size: 1.3rem;
  }
`;

const Nav = styled.nav`
  a {
    color: #ff4444;
    margin-left: 24px;
    font-weight: 700;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;
    user-select: none;
    cursor: pointer;

    &:hover {
      color: #ff1111;
      text-shadow: 0 0 10px #ff1111;
    }
  }
`;

const Main = styled.main`
  padding: 120px 40px 60px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 90px 20px 40px;
  }
`;

const Section = styled.section`
  margin-bottom: 60px;
`;

const AboutContainer = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const PhotoContainer = styled.div`
  perspective: 800px;
  width: 250px;
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #330000, #220000);
  box-shadow: 0 0 20px #ff1111cc;
  user-select: none;
  cursor: grab;
`;

const ProfilePhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.2s ease;
  will-change: transform;
`;

const AboutTextContainer = styled.div`
  flex: 1;
`;

const AboutTitle = styled.h2`
  font-size: 2.3rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #ff4444;
  position: relative;
  margin-bottom: 20px;
  user-select: none;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    overflow: hidden;
    color: #ff1111;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    animation: glitchTop 1s infinite linear alternate-reverse;
  }

  &::after {
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    animation: glitchBottom 1.2s infinite linear alternate-reverse;
  }

  @keyframes glitchTop {
    0% { transform: translate(-2px, -2px); }
    100% { transform: translate(2px, 2px); }
  }

  @keyframes glitchBottom {
    0% { transform: translate(2px, 2px); }
    100% { transform: translate(-2px, -2px); }
  }
`;

const TypingText = styled.p`
  font-size: 1.12rem;
  line-height: 1.5;
  color: #ff9999;
  min-height: 5em;
  white-space: pre-wrap;
`;

const AboutLink = styled.a`
  color: #ff1111;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ff4444;
    text-shadow: 0 0 10px #ff4444;
  }
`;

const ContactTitle = styled.h2`
  font-size: 2.3rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  color: #ff4444;
  margin-bottom: 24px;
  user-select: none;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const ButtonLink = styled.a`
  background: #330000;
  color: #ff4444;
  font-weight: 700;
  padding: 15px 28px;
  border-radius: 12px;
  box-shadow: 0 0 10px #ff1111cc;
  border: 1.5px solid #ff1111;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  text-decoration: none;
  user-select: none;
  min-width: 140px;
  text-align: center;
  cursor: pointer;
  font-size: 1.1rem;
  letter-spacing: 0.05em;

  &:hover {
    background: #ff1111;
    box-shadow: 0 0 25px #ff4444cc;
    color: #fff;
    transform: scale(1.07);
    text-shadow: 0 0 15px #fff;
  }
`;

export default function Portfolio() {
  const [typedText, setTypedText] = useState('');
  const aboutFullText =
    'Sou Cauã Vitor França de Souza, estudante e entusiasta da programação e tecnologia. Estou sempre buscando aprender e crescer na área de desenvolvimento de sistemas.';

  const [headerShrink, setHeaderShrink] = useState(false);

  const photoRef = useRef(null);
  const photoContainerRef = useRef(null);

  // Typing effect
  useEffect(() => {
    let index = 0;
    function type() {
      if (index < aboutFullText.length) {
        setTypedText((prev) => prev + aboutFullText.charAt(index));
        index++;
        setTimeout(type, 40);
      }
    }
    type();
  }, []);

  // Scroll header shrink effect
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setHeaderShrink(true);
      } else {
        setHeaderShrink(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Photo tilt effect
  useEffect(() => {
    const photoContainer = photoContainerRef.current;
    const photo = photoRef.current;

    if (!photoContainer || !photo) return;

    function onMouseMove(e) {
      const rect = photoContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      photo.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }

    function onMouseLeave() {
      photo.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }

    photoContainer.addEventListener('mousemove', onMouseMove);
    photoContainer.addEventListener('mouseleave', onMouseLeave);

    return () => {
      photoContainer.removeEventListener('mousemove', onMouseMove);
      photoContainer.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Generate particles data once
  const particles = React.useMemo(() => {
    return Array(backgroundParticlesCount)
      .fill()
      .map(() => ({
        size: Math.random() * 15 + 10,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }));
  }, []);

  return (
    <Container>
      <Background>
        {particles.map((p, i) => (
          <Particle
            key={i}
            style={{
              width: p.size + 'px',
              height: p.size + 'px',
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </Background>

      <Header className={headerShrink ? 'shrink' : ''}>
        Cauã Vitor França de Souza
        <Nav>
          <a href="#about">Sobre Mim</a>
          <a href="#contact">Contato</a>
        </Nav>
      </Header>

      <Main>
        <Section id="about">
          <AboutContainer>
            <PhotoContainer ref={photoContainerRef}>
              <ProfilePhoto
                ref={photoRef}
                src="mypho.jpg"
                alt="Foto de Cauã Vitor França de Souza"
                draggable={false}
              />
            </PhotoContainer>
            <AboutTextContainer>
              <AboutTitle data-text="SOBRE MIM">SOBRE MIM</AboutTitle>
              <TypingText>{typedText}</TypingText>
              <p>
                Se quiser me conhecer melhor,{' '}
                <AboutLink href="#contact">clique aqui</AboutLink> para falar comigo!
              </p>
            </AboutTextContainer>
          </AboutContainer>
        </Section>

        <Section id="contact">
          <ContactTitle>CONTATO</ContactTitle>
          <Buttons>
            <ButtonLink
              href="https://api.whatsapp.com/send?phone=5591991795383&text=Olá!"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              WhatsApp
            </ButtonLink>
            <ButtonLink
              href="https://github.com/cauavfs"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              GitHub
            </ButtonLink>
            <ButtonLink href="mailto:caua.vitorfs@gmail.com">E-mail</ButtonLink>
            <ButtonLink
              href="https://www.linkedin.com/in/cauavfs/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              LinkedIn
            </ButtonLink>
          </Buttons>
        </Section>
      </Main>
    </Container>
  );
}
