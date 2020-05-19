import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import styled from "styled-components"

import Layout from '../components/layout';
import GithubSearch from '../components/GithubSearch';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170, },
  { id: 'location', label: 'Location', minWidth: 150 },
  { id: 'coordinator', label: 'Website', minWidth: 150 },
  { id: 'view', label: 'Total\u00a0Views', minWidth: 150 },
];

function createData(name :JSX.Element, location :string, coordinator :JSX.Element, view :number) {
  return { name, location, coordinator, view };
}

const rows = [
  createData(<a href="https://www.meetup.com/find/events/?allMeetups=false&keywords=hackathons&radius=50&userFreeform=Toronto%2C+Ontario%2C+Canada&mcId=c560735&mcName=Toronto%2C+Ontario%2C+CA&eventFilter=all">Toronto Hackathons</a>, 'Toronto, ON', <a href="https://www.meetup.com/">MeetUp</a>, 3287263),
  createData(<a href="https://www.eventbrite.ca/d/online/hackathons/">Online</a>, 'Remote', <a href="https://www.eventbrite.com/">EventBrite</a>, 9596961),
  createData(<a href="https://hackthe6ix.com/">Summer Hackathon</a>, 'Toronto', <a href="https://hackthe6ix.com/">Hack The 6ix</a>, 301340),
  createData(<a href="https://www.meetup.com/Microsoft-Reactor-Toronto/events/270364941/">Nurse Hack 4 Health</a>, 'Remote', <a href="https://www.meetup.com/">MeetUp</a>, 327167434, 9833520),
  createData(<a href="https://www.meetup.com/Blockchain-Toronto/events/269752382/">Global SOS Hackathon</a>, 'Toronto', <a href="https://www.meetup.com/">MeetUp</a>, 9984670),
  createData(<a href="https://hackthenorth.com/">Hack The North</a>, 'Waterloo, ON', <a href="https://hackthenorth.com/">Hack The North</a>, 7692024),
  createData(<a href="http://www.lumohacks.com/">Canada's Ultimate Health Hackathon</a>, 'Burnaby, BC', <a href="http://www.lumohacks.com/">Lumo Hacks</a>, 357578),
  createData(<a href="https://hackathons.hackclub.com/">Hack Club</a>, 'San Francisco, CA', <a href="https://www.nanoseedhackathon.com/">Hack Club</a>, 9833520),
  createData(<a href="https://teenhackshtx.site/">Teen Hacks</a>, 'New York City, NY', <a href="https://teenhackshtx.site/">Teen Hacks HTX</a>, 9984670),
  createData(<a href="https://www.bithacks.io/">AI Social Impact</a>, 'Online', <a href="https://www.bithacks.io/">Bit Hacks</a>, 7692024),
  createData(<a href="https://starterhacks.ca/">Beginner Friendly</a>, 'Waterloo, ON', <a href="https://starterhacks.ca/">Starter Hacks</a>, 357578),
  createData(<a href="https://www.meetup.com/find/events/?allMeetups=false&keywords=hackathons&radius=50&userFreeform=Toronto%2C+Ontario%2C+Canada&mcId=c560735&mcName=Toronto%2C+Ontario%2C+CA&eventFilter=all">Toronto Hackathons</a>, 'Toronto, ON', <a href="https://www.meetup.com/">MeetUp</a>, 3287263),
  createData(<a href="https://www.eventbrite.ca/d/online/hackathons/">Online</a>, 'Remote', <a href="https://www.eventbrite.com/">EventBrite</a>, 9596961),
  createData(<a href="https://hackthe6ix.com/">Summer Hackathon</a>, 'Toronto', <a href="https://hackthe6ix.com/">Hack The 6ix</a>, 301340),
  createData(<a href="https://www.meetup.com/Microsoft-Reactor-Toronto/events/270364941/">Nurse Hack 4 Health</a>, 'Remote', <a href="https://www.meetup.com/">MeetUp</a>, 327167434, 9833520),
  createData(<a href="https://www.meetup.com/Blockchain-Toronto/events/269752382/">Global SOS Hackathon</a>, 'Toronto', <a href="https://www.meetup.com/">MeetUp</a>, 9984670),
  createData(<a href="https://hackthenorth.com/">Hack The North</a>, 'Waterloo, ON', <a href="https://hackthenorth.com/">Hack The North</a>, 7692024),
  createData(<a href="http://www.lumohacks.com/">Canada's Ultimate Health Hackathon</a>, 'Burnaby, BC', <a href="http://www.lumohacks.com/">Lumo Hacks</a>, 357578),
  createData(<a href="https://hackathons.hackclub.com/">Hack Club</a>, 'San Francisco, CA', <a href="https://www.nanoseedhackathon.com/">Hack Club</a>, 9833520),
  createData(<a href="https://teenhackshtx.site/">Teen Hacks</a>, 'New York City, NY', <a href="https://teenhackshtx.site/">Teen Hacks HTX</a>, 9984670),
  createData(<a href="https://www.bithacks.io/">AI Social Impact</a>, 'Online', <a href="https://www.bithacks.io/">Bit Hacks</a>, 7692024),
  createData(<a href="https://starterhacks.ca/">Beginner Friendly</a>, 'Waterloo, ON', <a href="https://starterhacks.ca/">Starter Hacks</a>, 357578),
  createData(<a href="https://www.meetup.com/find/events/?allMeetups=false&keywords=hackathons&radius=50&userFreeform=Toronto%2C+Ontario%2C+Canada&mcId=c560735&mcName=Toronto%2C+Ontario%2C+CA&eventFilter=all">Toronto Hackathons</a>, 'Toronto, ON', <a href="https://www.meetup.com/">MeetUp</a>, 3287263),
  createData(<a href="https://www.eventbrite.ca/d/online/hackathons/">Online</a>, 'Remote', <a href="https://www.eventbrite.com/">EventBrite</a>, 9596961),
  createData(<a href="https://hackthe6ix.com/">Summer Hackathon</a>, 'Toronto', <a href="https://hackthe6ix.com/">Hack The 6ix</a>, 301340),
  createData(<a href="https://www.meetup.com/Microsoft-Reactor-Toronto/events/270364941/">Nurse Hack 4 Health</a>, 'Remote', <a href="https://www.meetup.com/">MeetUp</a>, 327167434, 9833520),
  createData(<a href="https://www.meetup.com/Blockchain-Toronto/events/269752382/">Global SOS Hackathon</a>, 'Toronto', <a href="https://www.meetup.com/">MeetUp</a>, 9984670),
  createData(<a href="https://hackthenorth.com/">Hack The North</a>, 'Waterloo, ON', <a href="https://hackthenorth.com/">Hack The North</a>, 7692024),
  createData(<a href="http://www.lumohacks.com/">Canada's Ultimate Health Hackathon</a>, 'Burnaby, BC', <a href="http://www.lumohacks.com/">Lumo Hacks</a>, 357578),
  createData(<a href="https://hackathons.hackclub.com/">Hack Club</a>, 'San Francisco, CA', <a href="https://www.nanoseedhackathon.com/">Hack Club</a>, 9833520),
  createData(<a href="https://teenhackshtx.site/">Teen Hacks</a>, 'New York City, NY', <a href="https://teenhackshtx.site/">Teen Hacks HTX</a>, 9984670),
  createData(<a href="https://www.bithacks.io/">AI Social Impact</a>, 'Online', <a href="https://www.bithacks.io/">Bit Hacks</a>, 7692024),
  createData(<a href="https://starterhacks.ca/">Beginner Friendly</a>, 'Waterloo, ON', <a href="https://starterhacks.ca/">Starter Hacks</a>, 357578),
  createData(<a href="https://www.meetup.com/find/events/?allMeetups=false&keywords=hackathons&radius=50&userFreeform=Toronto%2C+Ontario%2C+Canada&mcId=c560735&mcName=Toronto%2C+Ontario%2C+CA&eventFilter=all">Toronto Hackathons</a>, 'Toronto, ON', <a href="https://www.meetup.com/">MeetUp</a>, 3287263),
  createData(<a href="https://www.eventbrite.ca/d/online/hackathons/">Online</a>, 'Remote', <a href="https://www.eventbrite.com/">EventBrite</a>, 9596961),
  createData(<a href="https://hackthe6ix.com/">Summer Hackathon</a>, 'Toronto', <a href="https://hackthe6ix.com/">Hack The 6ix</a>, 301340),
  createData(<a href="https://www.meetup.com/Microsoft-Reactor-Toronto/events/270364941/">Nurse Hack 4 Health</a>, 'Remote', <a href="https://www.meetup.com/">MeetUp</a>, 327167434, 9833520),
  createData(<a href="https://www.meetup.com/Blockchain-Toronto/events/269752382/">Global SOS Hackathon</a>, 'Toronto', <a href="https://www.meetup.com/">MeetUp</a>, 9984670),
  createData(<a href="https://hackthenorth.com/">Hack The North</a>, 'Waterloo, ON', <a href="https://hackthenorth.com/">Hack The North</a>, 7692024),
  createData(<a href="http://www.lumohacks.com/">Canada's Ultimate Health Hackathon</a>, 'Burnaby, BC', <a href="http://www.lumohacks.com/">Lumo Hacks</a>, 357578),
  createData(<a href="https://hackathons.hackclub.com/">Hack Club</a>, 'San Francisco, CA', <a href="https://www.nanoseedhackathon.com/">Hack Club</a>, 9833520),
  createData(<a href="https://teenhackshtx.site/">Teen Hacks</a>, 'New York City, NY', <a href="https://teenhackshtx.site/">Teen Hacks HTX</a>, 9984670),
  createData(<a href="https://www.bithacks.io/">AI Social Impact</a>, 'Online', <a href="https://www.bithacks.io/">Bit Hacks</a>, 7692024),
  createData(<a href="https://starterhacks.ca/">Beginner Friendly</a>, 'Waterloo, ON', <a href="https://starterhacks.ca/">Starter Hacks</a>, 357578),
  createData(<a href="https://www.meetup.com/find/events/?allMeetups=false&keywords=hackathons&radius=50&userFreeform=Toronto%2C+Ontario%2C+Canada&mcId=c560735&mcName=Toronto%2C+Ontario%2C+CA&eventFilter=all">Toronto Hackathons</a>, 'Toronto, ON', <a href="https://www.meetup.com/">MeetUp</a>, 3287263),
  createData(<a href="https://www.eventbrite.ca/d/online/hackathons/">Online</a>, 'Remote', <a href="https://www.eventbrite.com/">EventBrite</a>, 9596961),
  createData(<a href="https://hackthe6ix.com/">Summer Hackathon</a>, 'Toronto', <a href="https://hackthe6ix.com/">Hack The 6ix</a>, 301340),
  createData(<a href="https://www.meetup.com/Microsoft-Reactor-Toronto/events/270364941/">Nurse Hack 4 Health</a>, 'Remote', <a href="https://www.meetup.com/">MeetUp</a>, 327167434, 9833520),
  createData(<a href="https://www.meetup.com/Blockchain-Toronto/events/269752382/">Global SOS Hackathon</a>, 'Toronto', <a href="https://www.meetup.com/">MeetUp</a>, 9984670),
  createData(<a href="https://hackthenorth.com/">Hack The North</a>, 'Waterloo, ON', <a href="https://hackthenorth.com/">Hack The North</a>, 7692024),
  createData(<a href="http://www.lumohacks.com/">Canada's Ultimate Health Hackathon</a>, 'Burnaby, BC', <a href="http://www.lumohacks.com/">Lumo Hacks</a>, 357578),
  createData(<a href="https://hackathons.hackclub.com/">Hack Club</a>, 'San Francisco, CA', <a href="https://www.nanoseedhackathon.com/">Hack Club</a>, 9833520),
  createData(<a href="https://teenhackshtx.site/">Teen Hacks</a>, 'New York City, NY', <a href="https://teenhackshtx.site/">Teen Hacks HTX</a>, 9984670),
  createData(<a href="https://www.bithacks.io/">AI Social Impact</a>, 'Online', <a href="https://www.bithacks.io/">Bit Hacks</a>, 7692024),
  createData(<a href="https://starterhacks.ca/">Beginner Friendly</a>, 'Waterloo, ON', <a href="https://starterhacks.ca/">Starter Hacks</a>, 357578),
  
];

const useStyles = makeStyles({
  root: {
    width: '25%',
  },
  container: {
    maxHeight: 440,
  },
  text: {
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
});

const StatsTable = styled(Paper)`
  width: 75%;
  max-width: 800px;
  min-width: 450px;
  // margin: 0 auto;
`;

const Section = styled.section`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (newPage :any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event :any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
      <Section>
        <StatsTable className={classes.root}>
          <TableContainer className={`${classes.container} ${"dark"}`}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className={classes.title}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row :any, index :number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} className={classes.text}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 15, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </StatsTable>
        <GithubSearch/>
      </Section>
    </Layout>
  );
}