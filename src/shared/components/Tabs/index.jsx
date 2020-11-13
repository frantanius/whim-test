import { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab } from '@material-ui/core'
import GridContainer from 'shared/components/Grid/GridContainer'
import GridItem from 'shared/components/Grid/GridItem'
import styles from './tabsStyle'

const useStyles = makeStyles(styles)

const TabsComponent = (props) => {
  const [active, setActive] = useState(props.active)
  const classes = useStyles()
  const { tabs, direction, color, horizontal, alignCenter } = props
  const flexContainerClasses = classNames({
    [classes.flexContainer]: true,
    [classes.horizontalDisplay]: horizontal !== undefined,
  })
  const tabButtons = (
    <Tabs
      classes={{
        root: classes.root,
        fixed: classes.fixed,
        flexContainer: flexContainerClasses,
        indicator: classes.displayNone,
      }}
      value={active}
      onChange={(e, active) => setActive(active)}
      centered={alignCenter}
    >
      {tabs.map((prop, key) => {
        var icon = {}
        if (prop.tabIcon !== undefined) {
          icon['icon'] = <prop.tabIcon className={classes.tabIcon} />
        }
        const pillsClasses = classNames({
          [classes.pills]: true,
          [classes.horizontalPills]: horizontal !== undefined,
          [classes.pillsWithIcons]: prop.tabIcon !== undefined,
        })
        return (
          <Tab
            label={prop.tabButton}
            key={key}
            {...icon}
            classes={{
              root: pillsClasses,
              selected: classes[color],
              wrapper: classes.tabWrapper,
            }}
          />
        )
      })}
    </Tabs>
  )
  const tabContent = (
    <div className={classes.contentWrapper}>
      <SwipeableViews
        axis={direction === 'rtl' ? 'x-reverse' : 'x'}
        index={active}
        onChangeIndex={(index) => setActive(index)}
      >
        {tabs.map((prop, key) => {
          return (
            <div className={classes.tabContent} key={key}>
              {prop.tabContent}
            </div>
          )
        })}
      </SwipeableViews>
    </div>
  )
  return horizontal !== undefined ? (
    <GridContainer>
      <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
      <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
    </GridContainer>
  ) : (
    <div>
      {tabButtons}
      {tabContent}
    </div>
  )
}

TabsComponent.defaultProps = {
  active: 1,
  color: 'primary',
}

TabsComponent.propTypes = {
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node,
    }),
  ).isRequired,
  color: PropTypes.oneOf([
    'primary',
    'warning',
    'danger',
    'success',
    'info',
    'rose',
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object,
  }),
  alignCenter: PropTypes.bool,
}

export default TabsComponent
