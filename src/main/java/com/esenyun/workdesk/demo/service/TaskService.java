package com.esenyun.workdesk.demo.service;

import com.esenyun.workdesk.demo.domain.Task;
import com.esenyun.workdesk.demo.repository.TaskRepository;
import com.esenyun.workdesk.demo.repository.search.TaskSearchRepository;
import com.esenyun.workdesk.demo.service.dto.TaskDTO;
import com.esenyun.workdesk.demo.service.mapper.TaskMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Task.
 */
@Service
@Transactional
public class TaskService {

    private final Logger log = LoggerFactory.getLogger(TaskService.class);

    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    private final TaskSearchRepository taskSearchRepository;

    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper, TaskSearchRepository taskSearchRepository) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.taskSearchRepository = taskSearchRepository;
    }

    /**
     * Save a task.
     *
     * @param taskDTO the entity to save
     * @return the persisted entity
     */
    public TaskDTO save(TaskDTO taskDTO) {
        log.debug("Request to save Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        TaskDTO result = taskMapper.toDto(task);
        taskSearchRepository.save(task);
        return result;
    }

    /**
     * Get all the tasks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TaskDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tasks");
        return taskRepository.findAll(pageable)
            .map(taskMapper::toDto);
    }


    /**
     * Get one task by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TaskDTO> findOne(Long id) {
        log.debug("Request to get Task : {}", id);
        return taskRepository.findById(id)
            .map(taskMapper::toDto);
    }

    /**
     * Delete the task by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Task : {}", id);
        taskRepository.deleteById(id);
        taskSearchRepository.deleteById(id);
    }

    /**
     * Search for the task corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TaskDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Tasks for query {}", query);
        return taskSearchRepository.search(queryStringQuery(query), pageable)
            .map(taskMapper::toDto);
    }
}
