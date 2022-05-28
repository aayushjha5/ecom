import { Facebook, Instagram, MailOutline, Phone, Room, Twitter, YouTube } from '@material-ui/icons';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
`;

const Left = styled.div`
flex: 1;
display: flex;
flex-direction: column;
padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
margin: 20px 0px
`;

const SocialContainer = styled.div`
display: flex;

`;

const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
background-color: #${props => props.color};
display: flex;
justify-content: center;
align-items: center;
margin-right: 10px;
cursor: pointer;
`;

const Center = styled.div`
flex: 1;
padding: 20px;
`;

const Title = styled.h3`
margin-bottom: 20px;
`;

const List = styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;
`;

const ListItem = styled.li`
width: 50%;
margin-bottom: 10px;
cursor: pointer;
`;

const Right = styled.div`
flex: 1;
padding: 20px;
`;

const ContactItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
`;

const Payment = styled.img`
width: 50%;
`;


const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>BAZAAR</Logo>
        <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. A error labore, natus magni deleniti eveniet molestias. Ipsam non laudantium aliquam suscipit maiores incidunt exercitationem, vitae accusamus veniam at, doloremque consequatur?</Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="FF0000">
            <YouTube />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men Fashion</ListItem>
          <ListItem>Women Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Orders</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms & Conditions</ListItem>
          <ListItem>Cancellation & Returns</ListItem>
        </List>
      </Center>
      <Right>
      <Title>Contact Us</Title>
      <ContactItem>
       <Room style={{marginRight:"10px"}} />
       Shaitan Gali, Khatra Mahal, Andher nagar, Shamshan ke saamne - 400001
      </ContactItem>
      <ContactItem>
       <Phone style={{marginRight:"10px"}} />
        <a href="+919876543210" style={{color: 'teal'}}> +91 987 654 3210 </a>
      </ContactItem>
      <ContactItem>
      <MailOutline style={{marginRight:"10px"}} />
       <a href='mailto:aayushjha5@gmail.com' style={{color: 'teal'}}>Email me!</a>
      </ContactItem>
      <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  )
}

export default Footer