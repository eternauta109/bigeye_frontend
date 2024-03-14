import { Card, Container, Box, Typography } from "@mui/material";
import CardForWhatIShould from "./CardForWhatIShould";
import React from "react";

const WhatShouldIdo = () => {
  return (
    <Container>
      <Typography variant="h2" font-size="20" sx={{ m: 5 }}>
        What i should when...
      </Typography>

      <Box spacing={1} sx={{ mb: 2, display: "flex", flexWrap: "wrap" }}>
        <CardForWhatIShould
          title={"for report a incidente report"}
          url={
            "https://media.istockphoto.com/id/1371062685/it/foto/mano-del-conducente-che-esamina-lauto-ammaccata-con-parafango-danneggiato-parcheggiato-sul.jpg?s=612x612&w=is&k=20&c=Qsdprojv8OyN9tgcjdk8IVNCWGHP4SCrr3-dOiS9_ak="
          }
        />

        <CardForWhatIShould
          title={"for report a near miss"}
          url={
            "https://media.istockphoto.com/id/139379487/it/foto/buccia-di-banana.jpg?s=612x612&w=is&k=20&c=iHYfXvy8ktPFJNIHQm66NU_EAeZKAEmjVno-Xg23Oa4="
          }
        />
        <CardForWhatIShould
          title={"for report a new db facilities line"}
          url={
            "https://cdn.pixabay.com/photo/2016/11/15/09/24/builders-1825689_960_720.jpg"
          }
        />
        <CardForWhatIShould
          title={"for manual selling brief"}
          url={
            "https://media.istockphoto.com/id/1285337858/it/vettoriale/biglietto-ammettere-uno.jpg?s=612x612&w=is&k=20&c=OS9kD-FILSe8SZgPoXfGnskk2BGZl3XOvXtZ0-jsRvU="
          }
        />

        <CardForWhatIShould
          title={"to move a film in vista"}
          url={
            "https://cdn.pixabay.com/photo/2013/11/28/10/02/camera-219958_960_720.jpg"
          }
        />
        <CardForWhatIShould
          title={"to wire a worker with jobby"}
          url={
            "https://cdn.pixabay.com/photo/2017/06/02/22/01/dog-2367414_960_720.png"
          }
        />
        <CardForWhatIShould
          title={"to change a proj lamp"}
          url={
            "https://cdn.pixabay.com/photo/2017/01/26/08/07/light-bulb-2010022_960_720.jpg"
          }
        />
        <CardForWhatIShould
          title={"for mark a broken seats"}
          url={
            "https://cdn.pixabay.com/photo/2012/04/28/19/08/room-44084_960_720.png"
          }
        />
      </Box>
    </Container>
  );
};

export default WhatShouldIdo;
