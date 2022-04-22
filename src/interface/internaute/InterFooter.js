import React from 'react';
import { Container, Segment, List, Divider, Grid, Button} from 'semantic-ui-react'

const Interfooter = () => {
    return (
        <div>
            <Segment inverted vertical style={{ margin: '3em 0em 0em', padding: '3em 0em' }}>
                <Container textAlign='center'>
                    <Grid columns={3} divided stackable inverted>
                        <Grid.Row>
                            <Grid.Column>
                                <p>hello1</p>
                            </Grid.Column>
                            <Grid.Column>
                                <p>hello2</p>
                            </Grid.Column>
                            <Grid.Column>
                                <Button circular color='facebook' icon='facebook' />
                                <Button circular color='twitter' icon='twitter' />
                                <Button circular color='instagram' icon='instagram' />
                                <Button circular color='linkedin' icon='linkedin' />
                                <Button circular color='youtube' icon='youtube' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider inverted section />
                    <List horizontal inverted divided link size='small'>
                        <List.Item as='a' href='#'>
                            Contactez-nous
                        </List.Item>
                        <List.Item as='a' href='#'>
                            Politique de Confidentialité
                        </List.Item>
                        <List.Item as='a' href='#'>
                            Politique de Cookies
                        </List.Item>
                    </List>
                </Container>
            </Segment>
        </div>
    );
}

export default Interfooter;
